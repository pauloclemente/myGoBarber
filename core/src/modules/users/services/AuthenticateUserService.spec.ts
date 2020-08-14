import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authUser: AuthenticateUserService;
describe('AuthenticateUserService', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider();

		createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

		authUser = new AuthenticateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);
	});
	it('should be able to authenticate', async () => {
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
		await expect(
			authUser.execute({
				email: 'johndoe2@example.com',
				password: '123123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
	it('should not be able to authenticate with wrong password', async () => {
		await createUser.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123123',
		});

		await expect(
			authUser.execute({
				email: 'johndoe@example.com',
				password: '123123123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
