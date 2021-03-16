import { Test, TestingModule } from '@nestjs/testing';

import { FilesController } from './files.controller';
import { FilesService } from './files.service';


describe('Files Controller', () =>
{
	let filesService: FilesService;
	let filesController: FilesController;


	beforeEach(async () =>
	{
		const moduleRef: TestingModule = await Test.createTestingModule({
			controllers: [FilesController],
			providers: [FilesService],
		}).compile();

		filesService = moduleRef.get<FilesService>(FilesService);
		filesController = moduleRef.get<FilesController>(FilesController);
	});


	it('should be defined', () =>
	{
		expect(filesController).toBeDefined();
	});


	describe('Find All', () =>
	{

	});
});
