import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor() {}

  async createProduct(payload, file: Express.Multer.File) {
    const { buffer, ...rest } = file;
    return `product : ${JSON.stringify(payload)} \nfile: ${JSON.stringify(rest)}`;
  }
}
