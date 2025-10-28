import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import helmet from 'helmet';
// import crypto from 'crypto';

// globalThis.crypto = crypto.webcrypto || crypto;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Finexa API')
    .setDescription('The Finexa API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Global filters
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(helmet());

  // Start the application
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
