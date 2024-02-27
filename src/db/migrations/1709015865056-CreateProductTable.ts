import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductTable1709015865056 implements MigrationInterface {
  name = 'CreateProductTable1709015865056';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_entity" ("product_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "unit_price" double precision NOT NULL, "stock" integer NOT NULL, "image_url" character varying NOT NULL, CONSTRAINT "PK_d012d0b1bd1f40171cb1e3b8be7" PRIMARY KEY ("product_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "product_entity"`);
  }
}
