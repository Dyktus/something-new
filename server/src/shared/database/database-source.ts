import {DataSource} from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? "3306"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, // @ToDo turn it off through env flag
    logging: true,
    entities: [__dirname + '/../../domain/*.{js,ts}'],
});
