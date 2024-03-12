import { registerAs } from '@nestjs/config';
import * as PACKAGE_JSON from '../../package.json';

export const config = registerAs('config', () => ({
  project: {
    name: PACKAGE_JSON.name,
    version: PACKAGE_JSON.version,
    description: PACKAGE_JSON.description,
  },
  server: {
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  swagger: {
    enabled: Boolean(process.env.SWAGGER_ENABLED?.toLowerCase() === 'true'),
    path: process.env.SWAGGER_PATH,
  },
  s3: {
    bucket: process.env.BUCKET,
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    contentDisposition: process.env.CONTENT_DISPOSITION || 'inline',
    expireURL: Number(process.env.EXPIRE_URL_IMAGE) || 900,
  },
  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    retryAttempts: process.env.DB_RETRY_ATTEMPTS,
    retryDelay: process.env.DB_RETRY_DELAY,
    autoLoadEntities: process.env.DB_AUTOLOAD_ENTITIES,
    logging: Boolean(process.env.DB_LOGGING?.toLowerCase() === 'true'),
    synchronize: Boolean(process.env.DB_SYNCHRONIZE?.toLowerCase() === 'true'),
    migrationsRun: Boolean(
      process.env.DB_MIGRATIONS_RUN?.toLowerCase() === 'true',
    ),
  },
}));
