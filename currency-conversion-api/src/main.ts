import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * The port number for application is running on.
 * @type {string}
 */
export const APP_PORT = 8081;

/**
 * The url endpoint for open api ui
 * @type {string}
 */
export const SWAGGER_API_ROOT = 'api/docs';
/**
 * The name of the api
 * @type {string}
 */
export const SWAGGER_API_NAME = 'Currency Exchange';
/**
 * A short description of the api
 * @type {string}
 */
export const SWAGGER_API_DESCRIPTION =
  'Endpoints for currency exchange system.';
/**
 * Current version of the api
 * @type {string}
 */
export const SWAGGER_API_CURRENT_VERSION = '1.0';
/**
 * Current version of the api
 * @type {string}
 */
export const SWAGGER_API_TAG = 'currency_exchange';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .addTag(SWAGGER_API_TAG)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);
  app.enableCors();
  await app.listen(APP_PORT);
}
bootstrap();
