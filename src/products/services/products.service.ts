import { Injectable, Logger, StreamableFile } from '@nestjs/common';
import { FilesService } from '../../../src/files/services/files.service';
import { errorLog, getErrors } from '../../../src/utils/errors/errors';

@Injectable()
export class ProductsService {
  constructor(private readonly filesService: FilesService) {}
  private logger = new Logger(FilesService.name);

  async createProduct(payload, file: Express.Multer.File) {
    file.originalname = payload.name;
    await this.filesService.uploadFiles(file);
    return `product : ${JSON.stringify(payload)}`;
  }

  async getImageProduct(name: string) {
    const data = await this.filesService.getFile(name);
    const type = data.ContentType;
    const file = await data.Body.transformToByteArray();
    try {
      return new StreamableFile(file, { type });
    } catch (e) {
      this.logger.error(errorLog(e));
      getErrors(e);
    }
  }

  async getImageUrlProduct(name: string) {
    try {
      return this.filesService.getUrl(name);
    } catch (e) {
      this.logger.error(errorLog(e));
      getErrors(e);
    }
  }
}
