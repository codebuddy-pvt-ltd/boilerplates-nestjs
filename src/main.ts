import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ConfigService } from '@nestjs/config';
import { swaggerInit } from './config/swagger';

async function bootstrap() {
  // there is no serializer available for Prisma's BigInt type at the moment
  // manually serialize BigInt type to number
  BigInt.prototype['toJSON'] = function () {
    return Number(this.toString());
  };

  const configService = new ConfigService();
  const port = configService.get<number>('PORT');
  const origin = configService
    .get<string>('ORIGIN')
    .split(',')
    .map((s) => s.trim());

  const app = await NestFactory.create(AppModule, { cors: true });
  // enable cors
  app.enableCors({ origin });

  // initialize swagger ui
  swaggerInit(app);

  // add public folder to accessible for serving static files
  app.use('/public', express.static('public'));

  // start server
  await app.listen(port);
}
bootstrap();
