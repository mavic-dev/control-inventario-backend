import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config, validationSchema } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './db/typeorm.config';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      retryAttempts: parseInt(config().database.retryAttempts, 10) || 5,
      retryDelay: parseInt(config().database.retryDelay, 10) || 10,
      autoLoadEntities: Boolean(
        config().database.autoLoadEntities?.toLowerCase() === 'true',
      ),
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
