import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrudModule } from './crud/crud.module';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { Cat, CatSchema } from './schemas/cat.schema';
import { LoggerMiddleware } from './middleware/auth-middleware';




import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    CrudModule,
    MongooseModule.forRoot('mongodb://localhost/nest')
  ],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats')
  }

}
