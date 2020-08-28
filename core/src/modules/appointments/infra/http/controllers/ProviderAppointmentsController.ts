import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListAppoinmentsService from '@modules/appointments/services/ListAppointmentsService';

export default class ProviderAppointmentsController {
	/**
	 * index
	 */
	public async index(request: Request, response: Response): Promise<Response> {
		const provider_id = request.user.id;
		const { day, month, year } = request.body;

		const listProviderAppointments = container.resolve(ListAppoinmentsService);

		const appointments = await listProviderAppointments.execute({
			provider_id,
			day,
			month,
			year,
		});
		return response.json(appointments);
	}
}
