import {inject, injectable} from "inversify";
import {User} from "../../../domain";
import {NotFoundException, UnauthorizedException} from "../../../shared";
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

    public hashPassword(password: string): string {
        const salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(password, salt)
    }

    public async validateUserExists(userId: string): Promise<User> {
        const user_db: User | null = await this.userRepository.findById(userId);

        if (!user_db) {
            throw new NotFoundException("User not found.");
        }

        return user_db;
    }

    public async updateUserPassword(user: User, newPassword: string): Promise<void> {
       
        user.password = this.hashPassword(newPassword);
        await user.save();
    }

    public async registerUser(dto: RegisterDto): Promise<User> {
        return await this.userRepository.create(
            dto.email, this.hashPassword(dto.password)
        );
    }
}
