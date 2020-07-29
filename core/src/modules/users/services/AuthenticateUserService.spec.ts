import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUserService', () => {
	it('should be able to authenticate', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();

		const createUser = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		const authUser = new AuthenticateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		const user = await createUser.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123123',
		});

		const response = await authUser.execute({
			email: 'johndoe@example.com',
			password: '123123',
		});

		expect(response).toHaveProperty('token');
		expect(response.user).toEqual(user);
	});
	it('should not be able to authenticate with non existing user', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();

		const authUser = new AuthenticateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		await expect(
			authUser.execute({
				email: 'johndoe2@example.com',
				password: '123123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
	it('should not be able to authenticate with wrong password', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();

		const createUser = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);
		await createUser.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123123',
		});

		const authUser = new AuthenticateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		await expect(
			authUser.execute({
				email: 'johndoe@example.com',
				password: '123123123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
