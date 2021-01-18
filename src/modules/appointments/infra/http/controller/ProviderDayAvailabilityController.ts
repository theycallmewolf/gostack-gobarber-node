import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailabilityService from "@modules/appointments/services/ListProviderDayAvailabilityService";

export default class ProviderDayAvailabilityController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.query;

    const lstProviderDayAvailability = container.resolve(ListProviderDayAvailabilityService);
    const availability = await lstProviderDayAvailability.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(availability);
  }
}