import {
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';


@Injectable()
export class FilesService
{

	constructor() {}


	getFileName(originalname: string): string
	{
		return originalname.split('.').slice(0, -1).join('.');
	}


	async convertMdToPdf(content: string): Promise<Buffer>
	{
		const fs = require('fs');
		const { Readable } = require('stream');
		const { mdToPdf } = require('md-to-pdf');

		const pdf = await mdToPdf({
			content: content
		}).catch((e) =>
		{
			console.log(e);
			throw new InternalServerErrorException('Could not convert markdown.');
		});

		return pdf.content;
	}
}
