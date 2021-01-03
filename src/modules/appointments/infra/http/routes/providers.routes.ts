import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controller/ProvidersController';
import ProviderMonthAvailabilityController from '../controller/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controller/ProviderDayAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.create);

providersRouter.get('/:provider_id/monthly-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    }
  }),
  providerMonthAvailabilityController.create);

providersRouter.get('/:provider_id/daily-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    }
  }),
  providerDayAvailabilityController.create);

export default providersRouter;
