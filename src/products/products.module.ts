import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/products.entity';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
