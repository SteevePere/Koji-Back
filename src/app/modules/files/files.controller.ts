import {
	Controller,
	Res,
	Post,
	UploadedFile,
	UseInterceptors,
	BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

import {
	ApiTags,
	ApiOperation,
	ApiConsumes,
	ApiBody,
} from '@nestjs/swagger';

import { ApiFile } from './decorators/api-file';
import { FilesService } from './files.service';

import { fileInterceptorOptions } from './helpers/upload';


@Controller('files')
@ApiTags('Files')
export class FilesController
{

	constructor(private readonly filesService: FilesService) {}


	@Post('/convert')
	@ApiFile()
	@ApiConsumes('multipart/form-data')
	@ApiOperation({ summary: 'Convert a .md file to a .pdf file (max 100kB)' })
	@UseInterceptors(FileInterceptor('file', fileInterceptorOptions))
	async convertFile(
		@Res() response: Response,
		@UploadedFile() file: Express.Multer.File,
	): Promise<void>
	{
		if (!file)
			throw new BadRequestException('No file provided');

		const filename = this.filesService.getFileName(file.originalname);
		const buffer = await this.filesService.convertMdToPdf(file.buffer.toString());

		response.set({
      		'Content-Type': 'application/pdf',
      		'Content-Disposition': 'attachment; filename=' + filename + '.pdf',
			'Content-Length': buffer.length,
		});

		response.end(buffer);
	}
}
