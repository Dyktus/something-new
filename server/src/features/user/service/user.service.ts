import {inject, injectable} from "inversify";
import {User} from "../../../domain";
import {UnauthorizedException} from "../../../shared";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {RegisterDto} from "../dto/register.dto";
import {UserRepository} from "../repository/user.repository";

@injectable()
export class UserService {

    public constructor(
        @inject(UserRepository)
        private userRepository: UserRepository
    ) {
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

        return await this.userRepository.create(
            dto.email, hashedPassword
        );
    }
}
