import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import crypto from 'crypto';

// globalThis.crypto = crypto.webcrypto || crypto;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 300);
}
bootstrap();
