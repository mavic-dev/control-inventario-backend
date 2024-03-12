import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/products.entity';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { FilesModule } from '../../src/files/files.module';
import { FilesService } from '../../src/files/services/files.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), FilesModule],
  providers: [ProductsService, FilesService],
  controllers: [ProductsController],
})
export class ProductsModule {}
