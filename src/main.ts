import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { AppModule } from './app.module';
export const defaultDirectory = './public/upload';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.CORS,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      optionsSuccessStatus: 200,
    },
  });
  app.setGlobalPrefix('apis');

  if (!fs.existsSync(defaultDirectory)) {
    fs.mkdirSync(defaultDirectory, { recursive: true });
  }

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API Documentation for your application')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
    .addBearerAuth(
      {
        type: 'apiKey',
        name: 'x-api-key', // ชื่อของ API Key ที่จะใช้ใน header
        in: 'header', // API Key จะถูกส่งผ่านใน header
      },
      'api-key', // ชื่อของ security scheme สำหรับ API Key
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  //โชว์เฉพาะที่มี @ApiOperation
  document.paths = Object.entries(document.paths).reduce(
    (acc, [path, methods]) => {
      const filteredMethods = Object.entries(methods)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        .filter(([, methodDetails]) => methodDetails.summary)
        .reduce((methodAcc, [method, methodDetails]) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          methodAcc[method] = methodDetails;
          return methodAcc;
        }, {});

      if (Object.keys(filteredMethods).length) {
        acc[path] = filteredMethods;
      }

      return acc;
    },
    {},
  );
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      displayRequestDuration: true,
      tryItOutEnabled: true,
      requestSnippetsEnabled: true,
    },
  });
  await app.listen(process.env.BACKEND_PORT ?? 8000);
}
bootstrap();
