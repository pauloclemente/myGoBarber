import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import MonthAvailabilityController from '../controllers/MonthAvailabilityController';
import DayAvailabilityController from '../controllers/DayAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailability = new MonthAvailabilityController();
const providerDayAvailability = new DayAvailabilityController();

providersRouter.use(ensureAuthenticated);
providersRouter.get('/', providersController.index);
providersRouter.get(
	'/:provider_id/month-availability',
	providerMonthAvailability.index,
);
providersRouter.get(
	'/:provider_id/day-availability',
	providerDayAvailability.index,
);

export default providersRouter;
