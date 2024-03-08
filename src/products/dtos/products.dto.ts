import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class ProductDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'integer and decimals' })
  @IsNumberString()
  unit_price: string;

  @ApiProperty({ description: 'only integers' })
  @IsNumberString({ no_symbols: true })
  stock: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'jpg , jpeg , png',
  })
  @IsOptional()
  file?: Express.Multer.File;
}
