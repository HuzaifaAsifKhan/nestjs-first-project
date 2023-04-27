import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { ValidationError, ValidatorOptions } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // you can pass parameter to Create function of call enableCors function.
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  // app.enableCors();
  app.use(compression());// Just install Compression Package and Add this line Compression By default added for Express
  app.useGlobalPipes(new ValidationPipe(
    {
      disableErrorMessages: true,
    }
  ));
  await app.listen(3000)
    .then(result => {
      console.log('App Running on PORT 3000');
    })
    .catch(error => console.log(error));
}
bootstrap();



export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}