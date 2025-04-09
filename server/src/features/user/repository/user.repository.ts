import {inject, injectable} from "inversify";
import {QueryManager} from "../../../shared";
import {User} from "../../../domain";

@injectable()
export class UserRepository {

    public constructor(
        @inject(QueryManager)
        private queryManager: QueryManager
    ) {
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user_db: any = await this.queryManager
            .getManager()
            .getRepository(User)
            .findOne({where: {email}});

        if (!user_db) {
            return null;
        } else {
            return user_db;
        }
    }

    public async findById(id: string): Promise<User | null> {
        const user_db: any = await this.queryManager
            .getManager()
            .getRepository(User)
            .findOne({where: {id}});

        if (!user_db) {
            return null;
        } else {
            return user_db;
        }
    }

    public async create(email: string, hashedPassword: string): Promise<User | null> {
        const user = this.queryManager.getManager().getRepository(User).create({
            email: email,
            password: hashedPassword,
        })
        return await this.queryManager.getManager().save(user);
    }

    // public async update(userId: string, partialUser: Partial<User>): Promise<boolean> {
    //     await this.queryManager.getManager()
    //         .getRepository(User)
    //         .update({
    //             where: {
    //                 id: userId,
    //             }
    //         }, partialUser)
    // }


}
