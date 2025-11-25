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

  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5174',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Start the application
  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
  console.log(`Server is running on port ${port}`);
}

bootstrap();
