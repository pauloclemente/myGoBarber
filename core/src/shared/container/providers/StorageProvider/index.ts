import { container } from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DisKStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';

const providers = {
	disk: DiskStorageProvider,
	s3: S3StorageProvider,
};
container.registerSingleton<IStorageProvider>('StorageProvider', providers.s3);
