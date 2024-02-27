import { join } from 'path';
import { config } from '../../src/config';
import { DataSourceOptions, DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const {
  host,
  port,
  username,
  password,
  database,
  logging,
  synchronize,
  migrationsRun,
} = config().database;
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  entities: [join(__dirname, '../../src/**/**/*.entity.{ts,js}')],
  migrations: [join(__dirname, '../../src/db/migrations/*{.ts,.js}')],
  logging,
  synchronize,
  migrationsRun,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
