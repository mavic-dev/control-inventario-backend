import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductDTO } from '../dtos/products.dto';
import { ProductsService } from '../services/products.service';
import { fileFilterImage } from '../../utils/filters/file-image.filter';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilterImage,
    }),
  )
  @ApiBody({ type: ProductDTO })
  async createProduct(
    @Body() payload: ProductDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productService.createProduct(payload, file);
  }
}
