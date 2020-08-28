import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
	provider_id: string;
	day: number;
	month: number;
	year: number;
}
@injectable()
export default class ListAppoinmentsService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentRepository: IAppointmentsRepository,
	) {}

	public async execute({
		provider_id,
		year,
		month,
		day,
	}: IRequest): Promise<Appointment[]> {
		const appointments = await this.appointmentRepository.findAllInDayFromProvider(
			{
				provider_id,
				year,
				month,
				day,
			},
		);
		return appointments;
	}
}
