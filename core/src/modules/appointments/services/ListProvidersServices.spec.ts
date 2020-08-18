import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersServices';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		listProviders = new ListProvidersService(fakeUsersRepository);
	});
	it('show be able to list the providers', async () => {
		const user1 = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com.br',
			password: '123123',
		});
		const user2 = await fakeUsersRepository.create({
			name: 'John Trê',
			email: 'johntre@example.com.br',
			password: '123456',
		});
		const userOn = await fakeUsersRepository.create({
			name: 'John Wait',
			email: 'jhonwait@example.com.br',
			password: '123321',
		});
		const providers = await listProviders.execute({
			user_id: userOn.id,
		});
		expect(providers).toEqual([user1, user2]);
	});
});
