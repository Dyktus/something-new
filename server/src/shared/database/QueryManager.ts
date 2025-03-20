import { injectable } from "inversify";
import { QueryRunner, EntityManager } from "typeorm";
import {AppDataSource} from "./database-source";

@injectable()
export class QueryManager {
    private queryRunner: QueryRunner;

    constructor() {
        this.queryRunner = AppDataSource.createQueryRunner();
    }

    async connect(): Promise<void> {
        await this.queryRunner.connect();
    }

    async startTransaction(): Promise<void> {
        await this.queryRunner.connect();
        await this.queryRunner.startTransaction();
    }

    async commitTransaction(): Promise<void> {
        await this.queryRunner.commitTransaction();
    }

    async rollbackTransaction(): Promise<void> {
        await this.queryRunner.rollbackTransaction();
    }

    getManager(): EntityManager {
        return this.queryRunner.manager;
    }

    async release(): Promise<void> {
        await this.queryRunner.release();
    }
}
