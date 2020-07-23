import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDTO {
	email: string;
	password: string;
}
interface IResponseDTO {
	user: User;
	token: string;
}
@injectable()
export default class AuthenticateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	public async execute({
		email,
		password,
	}: IRequestDTO): Promise<IResponseDTO> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError('Incorret email/password combination', 401);
		}

		const passwordMatched = await compare(password, user.password);

		if (!passwordMatched) {
			throw new AppError('Incorret email/password combination', 401);
		}

		const { secret, expiresIn } = authConfig.jwt;
		const token = sign({}, secret, {
			subject: user.id,
			expiresIn,
		});
		return {
			user,
			token,
		};
	}
}
