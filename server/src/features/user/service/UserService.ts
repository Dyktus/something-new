import {inject, injectable} from "inversify";
import {User} from "../../../domain";
import {UnauthorizedException} from "../../../shared";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {RegisterDto} from "../dto/register.dto";
import {Repository} from "typeorm";

@injectable()
export class UserService {

    public constructor(
        @inject('UserRepository') private userRepository: Repository<User>,
    ) {
    }

    public async findUserByEmail(email: string): Promise<User | null> {
        const user_db: any = await this.userRepository.findOne({where: {email}});

        if (!user_db) {
            return null;
        } else {
            return user_db;
        }
    }

    /**
     * Validate user password
     * @param password
     * @param dbPassword
     */
    public comparePasswords(
        password: string,
        dbPassword: string,
    ): boolean {
        const passwordMatch = bcrypt.compareSync(password, dbPassword);
        if (!passwordMatch) {
            throw new UnauthorizedException("Invalid password");
        }
        return true;
    }

    public generateJwt(userId: string): Promise<string> {
        return jwt.sign(
            {userId: userId},
            process.env.JWT_SECRET_KEY,
            {expiresIn: "1h"}
        );
    }

    public async registerUser(dto: RegisterDto): Promise<User> {
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(dto.password, salt)

        const user = this.userRepository.create({
            email: dto.email,
            password: hashedPassword,
            username: dto.username,
        })
        await this.userRepository.save(user);

        return user;
    }
}
