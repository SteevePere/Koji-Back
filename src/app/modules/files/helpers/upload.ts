import {
	UnprocessableEntityException,
} from '@nestjs/common';


const fileFilter = (req: Request, file: Express.Multer.File, callback) =>
{
	if (file && !file.originalname.match(/\.(md)$/))
	{
		return callback(
			new UnprocessableEntityException('File type not allowed. Allowed file types: .md'),
			false
		);
	}

	return callback(null, true);
}


export const fileInterceptorOptions = {
	fileFilter: fileFilter,
	limits: {
    	files: 1,
		fileSize: 100000, // 100kb
	},
};
