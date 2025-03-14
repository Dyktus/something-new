import {DataSource, Repository} from 'typeorm';
import {User} from '../domain';
import {TeamUser} from "../domain/TeamUser";
import {TeamSubscription} from "../domain/TeamSubscription";
import {TeamBilling} from "../domain/TeamBilling";
import {SubscriptionPlan} from "../domain/SubscriptionPlan";
import {Team} from "../domain/Team";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? "3306"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, // @ToDo turn it off through env flag
    logging: false,
    entities: [User, TeamUser, TeamSubscription, TeamBilling, Team, SubscriptionPlan],
});

export const UserRepository: Repository<User> = AppDataSource.getRepository(User);
