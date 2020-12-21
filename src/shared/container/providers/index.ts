import { container } from 'tsyringe';
import IStorageProvider from './StorareProvider/models/IStorageProvider';
import DiskStorageProvider from './StorareProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider', DiskStorageProvider,
)

