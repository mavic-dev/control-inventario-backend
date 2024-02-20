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
}));
