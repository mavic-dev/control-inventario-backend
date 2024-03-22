import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/products.entity';
import { FilesService } from '../../../src/files/services/files.service';
import { errorLog, getErrors } from '../../../src/utils/errors/errors';
import { ProductDTO } from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private readonly filesService: FilesService,
  ) {}
  private logger = new Logger(ProductsService.name);

  async createProduct(payload: ProductDTO, file: Express.Multer.File) {
    try {
      const existProduct = await this.isExistProduct(payload.name);
      if (existProduct) {
        throw new BadRequestException(
          `Product with name '${payload.name}' exist. If the product does not exist, please insert another name`,
        );
      }
      const product = {
        name: payload.name,
        description: payload.description,
        unit_price: Number(payload.unit_price),
        stock: Number(payload.stock),
      };
      file.originalname = product.name;
      await this.filesService.uploadFiles(file);
      const productCreated = await this.productRepository.save(product);
      delete productCreated.product_id;
      this.logger.log(
        `RESPONSE CREATE PRODUCT: ${JSON.stringify(productCreated)}`,
      );
      return productCreated;
    } catch (e) {
      this.logger.error(errorLog(e));
      getErrors(e);
    }
  }

  async getProduct(name: string) {
    try {
      const existProduct = await this.isExistProduct(name);
      if (!existProduct) {
        throw new NotFoundException(`Product with name '${name}' dont exist`);
      }
      const product = await this.productRepository.findOneBy({ name });
      delete product.product_id;
      const urlProduct = await this.getImageUrlProduct(name);
      const response = {
        ...product,
        image_url: urlProduct,
      };
      this.logger.log(`RESPONSE GET PRODUCT : ${JSON.stringify(response)}`);
      return response;
    } catch (e) {
      this.logger.error(errorLog(e));
      getErrors(e);
    }
  }

  async deleteProduct(name: string) {
    try {
      const existProduct = await this.isExistProduct(name);
      if (!existProduct) {
        throw new NotFoundException(`Product with name '${name}' dont exist`);
      }
      await Promise.all([
        this.filesService.deleteFile(name),
        this.productRepository.delete({ name }),
      ]);
      this.logger.log(`RESPONSE DELETE PRODUCT : ${name}`);
      return;
    } catch (e) {
      this.logger.error(errorLog(e));
      getErrors(e);
    }
  }

  async isExistProduct(name: string) {
    return this.productRepository.existsBy({ name });
  }

  async getImageProduct(name: string) {
    try {
      const data = await this.filesService.getFile(name);
      const type = data.ContentType;
      const file = await data.Body.transformToByteArray();
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
