import * as Joi from 'joi';

export const JoiValidationsSchema: Joi.ObjectSchema = Joi.object({
  PORT: Joi.number().default(3000),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRE_TIME: Joi.number(),
  JWT_REFRESH_EXPIRE_TIME: Joi.number(),
  MONGODB_URI: Joi.string(),
});
