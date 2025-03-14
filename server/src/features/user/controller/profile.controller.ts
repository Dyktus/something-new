import {User} from "../../../domain/User";
import {NotFoundException, authGuard} from "../../../shared";
import {controller, httpGet} from "inversify-express-utils";
import {inject} from "inversify";
import {Repository} from "typeorm";

@controller("/profile")
export class ProfileController {

    constructor(
        @inject('UserRepository') private userRepository: Repository<User>,
    ) {
    }

    @httpGet('/', authGuard)
    public async index(req, res) {
        const user_db: any = await this.userRepository.findOne({
            where: {id: req.user.id},
        });

        if (!user_db) {
            throw new NotFoundException("User not found.");
        } else {
            return {username: user_db.username, email: user_db.email};
        }
    }
}
