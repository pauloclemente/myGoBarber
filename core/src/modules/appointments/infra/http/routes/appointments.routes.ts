import { Router } from 'express';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
/* appointmentsRouter.get('/', async (request, response) => {
	const appointmentsRepository = getCustomRepository(AppointmentsRepository);
	const appointment = await appointmentsRepository.find();
	return response.json(appointment);
}); */
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
