import {inject} from "inversify";
import {validateRequest} from "../../../shared";
import {UserRepository} from "../repository/user.repository";
import {TeamRepository} from "../repository/team.repository";
import {ADD_TO_TEAM_DTO, AddToTeamDto} from "../dto/add-to-team.dto";
import {controller, httpPost} from "inversify-express-utils";
import {User} from "../../../domain";


@controller('/team')
export class TeamController {

    public constructor(
        @inject(UserRepository)
        private readonly userRepository: UserRepository,
        @inject(TeamRepository)
        private readonly teamRepository: TeamRepository,
    ) {
    }

    /**
     * Endpoint responsible for adding new member of the team.
     * @param req
     */
    @httpPost('/invite-user', validateRequest(ADD_TO_TEAM_DTO))
    public async addToTeam(req) {
        const dto: AddToTeamDto = ADD_TO_TEAM_DTO.parse(req.body);
        const team = await this.teamRepository.findById(dto.teamId);

        if (!team) {
            throw new Error(`Team with ID ${dto.teamId} not found`);
        }

        const user_db: User = await this.userRepository.findByEmail(dto.email);
        const actionUser: User = await this.userRepository.findById(req.userId);

        if (user_db) {
            // if user exist in other teams already just add user to the team
            return await this.teamRepository.assignToTeam(
                user_db,
                team,
                actionUser
            );
        }
        // @ToDo Create account and sent invitation

    }
}
