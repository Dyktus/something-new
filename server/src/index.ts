import * as dotenv from "dotenv";
import * as express from 'express';
import * as cors from 'cors';
import {InversifyExpressServer} from "inversify-express-utils";
import {Container} from "inversify";
import "./features/user";
import {ProfileController, UserService} from "./features/user";
import "reflect-metadata"
import {AppDataSource, errorHandler, UserRepository} from "./shared";
import {User} from "./domain";
import {Repository} from "typeorm";
import {AuthController} from "./features/user/controller/auth.controller";

dotenv.config();

const start = async () => {
    let container = new Container();

    await AppDataSource.initialize();

    // Database binding
    container.bind<Repository<User>>('UserRepository').toConstantValue(UserRepository)

    // Services
    container.bind<UserService>('UserService').to(UserService);

    // Controllers
    container.bind<AuthController>(AuthController).toSelf();
    container.bind<ProfileController>(ProfileController).toSelf();

    let server = new InversifyExpressServer(container);
    server.setConfig((app) => {
        app.use(cors());
        app.use(express.urlencoded({extended: true}));
        app.use(express.json());
    });

    server.setErrorConfig((app) => {
        app.use(errorHandler);
    })

    const app = server.build();
    app.listen(process.env.PORT, () => {
        console.log(`server running on port ${process.env.PORT}`);
    });
}

start();
