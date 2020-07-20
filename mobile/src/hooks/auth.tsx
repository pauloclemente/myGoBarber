import React, {
	createContext,
	useCallback,
	useState,
	useContext,
	useEffect,
} from 'react';
import api from '../services/api';
import AsyncStorare from '@react-native-community/async-storage';

interface SignInCredendials {
	email: string;
	password: string;
}
interface IAuthState {
	token: string;
	user: object;
}
interface IAuthContextDTO {
	user: object;
	signIn(credencials: SignInCredendials): Promise<void>;
	signOut(): void;
}
const AuthContext = createContext<IAuthContextDTO>({} as IAuthContextDTO);

const AuthProvider: React.FC = ({ children }) => {
	const [data, setData] = useState<IAuthState>({} as IAuthState);
	useEffect(() => {
		async function loadStorageData(): Promise<void> {
			const [token, user] = await AsyncStorare.multiGet([
				'@GoBarber:token',
				'@GoBarber:user',
			]);

			if (token[1] && user[1]) {
				setData({ token: token[1], user: JSON.parse(user[1]) });
			}
		}
		loadStorageData();
	}, []);

	const signIn = useCallback(async ({ email, password }) => {
		const response = await api.post('sessions', { email, password });
		const { token, user } = response.data;
		await AsyncStorare.multiSet([
			['@GoBarber:token', token],
			['@GoBarber:user', JSON.stringify(user)],
		]);
		setData({ token, user });
	}, []);
	const signOut = useCallback(async () => {
		await AsyncStorare.multiRemove(['@GoBarber:token', '@GoBarber:user']);
		setData({} as IAuthState);
	}, []);
	return (
		<AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};
function useAuth(): IAuthContextDTO {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}

export { AuthProvider, useAuth };
