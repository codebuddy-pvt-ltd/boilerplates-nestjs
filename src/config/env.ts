import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

export const envOptions: ConfigModuleOptions = {
  envFilePath: '.env',
  isGlobal: true,
  validationSchema: Joi.object({
    PORT: Joi.string().required(),
    ORIGIN: Joi.string().required(),
  }).unknown(),
  validationOptions: {
    abortEarly: true,
  },
};
