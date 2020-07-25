import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDTO {
	name: string;
	email: string;
	password: string;
}
@injectable()
export default class CreateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	public async execute({ name, password, email }: IRequestDTO): Promise<User> {
		const checkUserExists = await this.usersRepository.findByEmail(email);

		if (checkUserExists) {
			throw new AppError('Email adress already used!');
		}
		const hashPassword = await hash(password, 8);
		const user = this.usersRepository.create({
			name,
			email,
			password: hashPassword,
		});

		return user;
	}
}