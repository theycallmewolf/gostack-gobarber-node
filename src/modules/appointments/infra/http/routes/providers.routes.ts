import { Router } from "express";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import ProvidersController from '../controller/ProvidersController';
import ProviderMonthAvailabilityController from '../controller/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controller/ProviderDayAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get("/", providersController.create);
providersRouter.get("/:provider_id/monthly-availability", providerMonthAvailabilityController.create);
providersRouter.get("/:provider_id/daily-availability", providerDayAvailabilityController.create);

export default providersRouter;
