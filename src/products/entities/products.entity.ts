import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  product_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'float' })
  unit_price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column()
  image_url: string;
}
