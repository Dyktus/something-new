import * as dotenv from "dotenv";
import * as express from 'express';
import * as cors from 'cors';
import {InversifyExpressServer} from "inversify-express-utils";
import {Container} from "inversify";
import "./features/user";
import {UserService} from "./features/user";
import "reflect-metadata"
import {AppDataSource} from "./shared";
import {User, UserRepository} from "./domain";
import {Repository} from "typeorm";

dotenv.config();

let container = new Container();

// Database connection
AppDataSource.initialize()
    .then(() => {
        container.bind<Repository<User>>('UserRepository').toConstantValue(UserRepository)
    })
    .catch((err) => console.error('DB Connection Error:', err));

// Do the binding
container.bind<UserService>('UserService').to(UserService);

let server = new InversifyExpressServer(container);
server.setConfig((app) => {
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
});

const app = server.build();
app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
})
