import * as Joi from 'joi';

export const JoiValidationsSchema: Joi.ObjectSchema = Joi.object({
  PORT: Joi.number().default(3000),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRE_TIME: Joi.string().default('2h'),
});
