import {validateRequest, QueryManager, authGuard} from "../../../shared";
import {controller, httpGet, httpPatch, httpPost} from 'inversify-express-utils';
import {REGISTER_DTO_SCHEMA} from "../dto/register.dto";
import {LOGIN_DTO_SCHEMA} from "../dto/login.dto";
import {UserService} from "../service/user.service";
import {inject} from "inversify";
import {TeamService} from "../service/team.service";
import {Team, User} from "../../../domain";
import {UserRepository} from "../repository/user.repository";
import {CHANGE_PASSWORD_DTO_SCHEMA} from "../dto/change-password.dto";

@controller('/profile')
export class ProfileController {

    public constructor(
        @inject(QueryManager)
        private queryManager: QueryManager,
        @inject(UserRepository)
        private readonly userRepository: UserRepository,
        @inject(UserService)
        private readonly userService: UserService,
        @inject(TeamService)
        private readonly teamService: TeamService,
    ) {
    }

    @httpPost('/register', validateRequest(REGISTER_DTO_SCHEMA))
    public async register(req) {
        let dto = REGISTER_DTO_SCHEMA.parse(req.body);
        const user_db: User = await this.userRepository.findByEmail(dto.email);

        if (user_db) {
            throw new Error(`User account already exists`);
        }

        try {
            await this.queryManager.startTransaction();

            const user: User = await this.userService.registerUser(dto);
            const team: Team = await this.teamService.createTeam(dto, user);

            await this.queryManager.commitTransaction();

            return {
                message: "User registered successfully",
                user: {
                    email: user.email,
                    id: user.id,
                },
                team: {
                    id: team.id
                }
            };

        } catch (err) {
            console.log('rollback');
            await this.queryManager.rollbackTransaction();
            throw err;
        }
    }


    @httpPost('/login', validateRequest(LOGIN_DTO_SCHEMA))
    public async login(req, res) {
        const dto = LOGIN_DTO_SCHEMA.parse(req.body);
        const user = await this.userService.validateUserExists(req.userId);

        // Compare the provided password with the hashed password
        try {
            this.userService.comparePasswords(dto.password, user.password);
        } catch (e) {
            return res.status(401).json({error: "Invalid password"});
        }
        return {
            message: "Login successful",
            data: {
                email: user.email,
                token: await this.userService.generateJwt(user.id)
            }
        };
    }

    @httpPatch('/change-password', validateRequest(CHANGE_PASSWORD_DTO_SCHEMA))
    public async changePassword(req) {
        const dto = CHANGE_PASSWORD_DTO_SCHEMA.parse(req.body);

        const userDb = await this.userService.validateUserExists(req.userId);
        this.userService.comparePasswords(dto.oldPassword, userDb.password);

        await this.userService.updateUserPassword(userDb, dto.newPassword);

        return {
            status: 'ok'
        }
    }

    @httpGet('', authGuard)
    public async index(req, res) {
        const user = await this.userService.validateUserExists(req.userId);
        const teams = await this.teamService.currentUserTeams(user);

        return {
            email: user.email,
            ...teams,
        };
    }
}
