import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListAppoinmentsService from './ListAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listAppointments: ListAppoinmentsService;

describe('ListProviderAppointments', () => {
	beforeEach(() => {
		fakeAppointmentsRepository = new FakeAppointmentsRepository();
		listAppointments = new ListAppoinmentsService(fakeAppointmentsRepository);
	});
	it('should be able to list appointments on a specific day', async () => {
		const appointments1 = await fakeAppointmentsRepository.create({
			provider_id: 'provider_id',
			user_id: 'user_id',
			date: new Date(2020, 10, 10, 15, 0, 0),
		});
		const appointments2 = await fakeAppointmentsRepository.create({
			provider_id: 'provider_id',
			user_id: 'user_id',
			date: new Date(2020, 10, 10, 14, 0, 0),
		});

		const appointments = await listAppointments.execute({
			provider_id: 'provider_id',
			year: 2020,
			month: 11,
			day: 10,
		});

		expect(appointments).toEqual([appointments1, appointments2]);
	});
});
