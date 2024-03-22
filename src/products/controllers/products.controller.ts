import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
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

  @Get(':name')
  @ApiParam({
    name: 'name',
    type: 'string',
    required: true,
  })
  async getProduct(@Param('name') name: string) {
    return this.productService.getProduct(name);
  }

  @Delete(':name')
  @ApiParam({
    name: 'name',
    type: 'string',
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProduct(@Param('name') name: string) {
    return this.productService.deleteProduct(name);
  }

  @Get('image/:name')
  @ApiParam({
    name: 'name',
    type: 'string',
    required: true,
  })
  async getImageProduct(@Param('name') name: string) {
    return this.productService.getImageProduct(name);
  }

  @Get('image/url/:name')
  @ApiParam({
    name: 'name',
    type: 'string',
    required: true,
  })
  async getImageUrlProduct(@Param('name') name: string) {
    return this.productService.getImageUrlProduct(name);
  }
}
