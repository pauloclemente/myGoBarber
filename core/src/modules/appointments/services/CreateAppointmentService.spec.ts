import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
	it('should be able to create a new appointment', async () => {
		const fakeAppointmentRepository = new FakeAppointmentRepository();
		const createAppointment = new CreateAppointmentService(
			fakeAppointmentRepository,
		);
		const appointment = await createAppointment.execute({
			date: new Date(),
			provider_id: 'qju7881h7g0dwq',
		});
		expect(appointment).toHaveProperty('id');
		expect(appointment.provider_id).toBe('qju7881h7g0dwq');
	});
	it('should not be able to create two appointments on the sama time', async () => {
		const fakeAppointmentRepository = new FakeAppointmentRepository();
		const createAppointment = new CreateAppointmentService(
			fakeAppointmentRepository,
		);

		const appointmentDate = new Date(2020, 4, 10, 11);
		await createAppointment.execute({
			date: appointmentDate,
			provider_id: 'qju7881h7g0dwq',
		});
		expect(
			createAppointment.execute({
				date: appointmentDate,
				provider_id: 'qju7881h7g0dwq',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});