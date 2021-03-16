import { DocumentBuilder } from '@nestjs/swagger';


export const swaggerConfiguration = new DocumentBuilder()
	.setTitle('File Service')
	.setDescription('A REST API to upload, convert & download files.')
	.setVersion('1.0')
	.build();
