import {NotFoundException, validateRequest} from "../../../shared";
import {controller, httpPost} from 'inversify-express-utils';
import {REGISTER_DTO_SCHEMA} from "../dto/register.dto";
import {LOGIN_DTO_SCHEMA} from "../dto/login.dto";
import {UserService} from "../service/UserService";
import {inject} from "inversify";

@controller('/profile')
export class AuthController {

    public constructor(
        @inject("UserService") private readonly userService: UserService,
    ) {
    }

    @httpPost('/register', validateRequest(REGISTER_DTO_SCHEMA))
    public async register(req, res) {
        let dto = REGISTER_DTO_SCHEMA.parse(req.body);
        const user_db = await this.userService.findUserByEmail(dto.email);

        if (user_db) {
            throw new Error(`User already exists`);
        }

        const new_user = await this.userService.registerUser(dto);
        const jwt = await this.userService.generateJwt(new_user.id);

        return {message: "User registered successfully", jwt};
    }

    @httpPost('/login', validateRequest(LOGIN_DTO_SCHEMA))
    public async login(req, res) {
        const dto = LOGIN_DTO_SCHEMA.parse(req.body);
        const user_db: any = await this.userService.findUserByEmail(dto.email);

        if (!user_db) {
            throw new NotFoundException("User not found");
        }
        // Compare the provided password with the hashed password
        const passwordMatch = this.userService.comparePasswords(dto.password, user_db.password);
        if (!passwordMatch) {
            return res.status(401).json({error: "Invalid password"});
        } else {
            return {message: "Login successful", token: await this.userService.generateJwt(user_db.id)};
        }
    }
}
