import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateProductTable1710214353326 implements MigrationInterface {
  name = 'UpdateProductTable1710214353326';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_entity" DROP COLUMN "image_url"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_entity" ADD CONSTRAINT "UQ_ebbac2bbbf7cb3bbec225dcf1e1" UNIQUE ("name")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_entity" DROP CONSTRAINT "UQ_ebbac2bbbf7cb3bbec225dcf1e1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_entity" ADD "image_url" character varying NOT NULL`,
    );
  }
}
