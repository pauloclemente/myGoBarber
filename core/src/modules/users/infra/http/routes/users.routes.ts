import { Router } from 'express';
import { container } from 'tsyringe';
import multer from 'multer';
import CreateUserService from '@modules/users/services/CreateUserService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '@modules/users/services/UpadateUserAvatarService';
import uploadConfig from '@config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
	const { name, password, email } = request.body;

	const createUser = container.resolve(CreateUserService);

	const user = await createUser.execute({ name, password, email });

	delete user.password;

	return response.json(user);
});
usersRouter.patch(
	'/avatar',
	ensureAuthenticated,
	upload.single('avatar'),
	async (request, response) => {
		const updateUserAvatar = container.resolve(UpdateUserAvatarService);
		const user = await updateUserAvatar.execute({
			user_id: request.user.id,
			avatar_filename: request.file.filename,
		});
		delete user.password;
		return response.json(user);
	},
);

export default usersRouter;
