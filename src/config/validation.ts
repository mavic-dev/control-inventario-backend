import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number(),
  SWAGGER_ENABLED: Joi.boolean(),
  SWAGGER_PATH: Joi.string(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_RETRY_ATTEMPTS: Joi.number(),
  DB_RETRY_DELAY: Joi.number(),
  DB_AUTOLOAD_ENTITIES: Joi.boolean(),
  DB_LOGGING: Joi.boolean(),
  DB_SYNCHRONIZE: Joi.boolean(),
  DB_MIGRATIONS_RUN: Joi.boolean(),
});
