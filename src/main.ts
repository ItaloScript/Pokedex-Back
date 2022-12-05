import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  console.log('Listening on port 3000', process.env.PORT);
  await app.listen( process.env.PORT || 3000);
}
bootstrap();
