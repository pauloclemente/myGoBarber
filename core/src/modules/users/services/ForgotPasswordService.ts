// import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
// import User from '../infra/typeorm/entities/User';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequestDTO {
	email: string;
}
@injectable()
export default class ForgotPasswordService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('MailProvider')
		private mailProvider: IMailProvider,
		@inject('UserTokensRepository')
		private userTokensRepositoroy: IUserTokensRepository,
	) {}

	public async execute({ email }: IRequestDTO): Promise<void> {
		const user = await this.usersRepository.findByEmail(email);
		// verifica o email
		if (!user) {
			throw new AppError('This email was not found');
		}
		// gera token
		const { token } = await this.userTokensRepositoroy.generate(user.id);

		await this.mailProvider.sendMail(
			email,
			`Pedido para recuperação de senha recebido: ${token}`,
		);
	}
}
