import {NotFoundException, validateRequest, QueryManager, authGuard} from "../../../shared";
import {controller, httpGet, httpPost} from 'inversify-express-utils';
import {REGISTER_DTO_SCHEMA} from "../dto/register.dto";
import {LOGIN_DTO_SCHEMA} from "../dto/login.dto";
import {UserService} from "../service/user.service";
import {inject} from "inversify";
import {TeamService} from "../service/team.service";
import {Team, User} from "../../../domain";
import {UserRepository} from "../repository/user.repository";
import {TeamRepository} from "../repository/team.repository";

@controller('/profile')
export class ProfileController {

    public constructor(
        @inject(UserService)
        private readonly userService: UserService,
        @inject(TeamService)
        private readonly teamService: TeamService,
        @inject(QueryManager)
        private queryManager: QueryManager,
        @inject(UserRepository)
        private readonly userRepository: UserRepository,
        @inject(TeamRepository)
        private readonly teamRepository: TeamRepository,
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
        const user_db: any = await this.userRepository.findByEmail(dto.email);

        if (!user_db) {
            throw new NotFoundException("User not found");
        }
        // Compare the provided password with the hashed password
        const passwordMatch = this.userService.comparePasswords(dto.password, user_db.password);
        if (!passwordMatch) {
            return res.status(401).json({error: "Invalid password"});
        } else {
            return {
                message: "Login successful",
                email: user_db.email,
                token: await this.userService.generateJwt(user_db.id)
            };
        }
    }

    @httpGet('/', authGuard)
    public async index(req, res) {
        const user_db: User | null = await this.userRepository.findById(req.userId);

        if (!user_db) {
            throw new NotFoundException("User not found.");
        } else {
            const teams: Team[] = await this.teamRepository.findUserTeams(user_db);

            return {
                email: user_db.email,
                teams,
            };
        }
    }
}
