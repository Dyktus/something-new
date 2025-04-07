import * as dotenv from "dotenv";
import * as express from 'express';
import * as cors from 'cors';
import {InversifyExpressServer} from "inversify-express-utils";
import {Container} from "inversify";
import "./features/user";
import {ProfileController, UserService, TeamService, UserRepository, TeamRepository} from "./features/user";
import "reflect-metadata"
import {
    AppDataSource,
    errorHandler,
    QueryManager
} from "./shared";
import {TeamController} from "./features/user/controller/team.controller";
import {SubscriptionRepository} from "./features/user/repository/subscription.repository";

dotenv.config();

const start = async () => {
    let container = new Container();

    await AppDataSource.initialize();

    // Database binding
    const queryManager = new QueryManager();
    container.bind<QueryManager>(QueryManager).toConstantValue(queryManager);

    // Repositories
    container.bind<UserRepository>(UserRepository).to(UserRepository);
    container.bind<TeamRepository>(TeamRepository).to(TeamRepository);
    container.bind<SubscriptionRepository>(SubscriptionRepository).to(SubscriptionRepository);

    // Services
    container.bind<UserService>(UserService).to(UserService);
    container.bind<TeamService>(TeamService).to(TeamService);

    // Controllers
    container.bind<ProfileController>(ProfileController).toSelf();
    container.bind<TeamController>(TeamController).toSelf();

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
