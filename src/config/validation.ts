import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number(),
  SWAGGER_ENABLED: Joi.boolean(),
  SWAGGER_PATH: Joi.string(),
});
