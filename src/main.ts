import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';

import { loggerConfiguration } from './config/winston/loggerConfiguration';
import { swaggerConfiguration } from './config/swagger/swaggerConfiguration';


async function bootstrap()
{
	// create
	const app = await NestFactory.create(AppModule, {
		logger: WinstonModule.createLogger(loggerConfiguration),
		cors: true,
    });

	// add field validators
	app.useGlobalPipes(new ValidationPipe({
		validationError: {
			target: false,
		},
	}));

	// add swagger bootstrap
  	const document = SwaggerModule.createDocument(app, swaggerConfiguration);
  	SwaggerModule.setup('/', app, document);

	// run
  	await app.listen(process.env.PORT || 3000);
}


bootstrap();
