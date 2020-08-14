import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
	beforeEach(() => {
		fakeAppointmentRepository = new FakeAppointmentRepository();
		createAppointment = new CreateAppointmentService(fakeAppointmentRepository);
	});

	it('should be able to create a new appointment', async () => {
		const appointment = await createAppointment.execute({
			date: new Date(),
			provider_id: 'qju7881h7g0dwq',
		});
		expect(appointment).toHaveProperty('id');
		expect(appointment.provider_id).toBe('qju7881h7g0dwq');
	});
	it('should not be able to create two appointments on the sama time', async () => {
		const appointmentDate = new Date(2020, 4, 10, 11);
		await createAppointment.execute({
			date: appointmentDate,
			provider_id: 'qju7881h7g0dwq',
		});
		await expect(
			createAppointment.execute({
				date: appointmentDate,
				provider_id: 'qju7881h7g0dwq',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
