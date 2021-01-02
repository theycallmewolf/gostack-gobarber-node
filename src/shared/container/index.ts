import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import iAppointmentsRepository from '@modules/appointments/repositories/IAppointmentRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'

import iUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import iUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

container.registerSingleton<iAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository
);

container.registerSingleton<iUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<iUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository
);

