import {inject} from "inversify";
import {authGuard, validateRequest} from "../../../shared";
import {UserRepository} from "../repository/user.repository";
import {TeamRepository} from "../repository/team.repository";
import {ADD_TO_TEAM_DTO, AddToTeamDto} from "../dto/add-to-team.dto";
import {controller, httpDelete, httpGet, httpPatch, httpPost, requestParam} from "inversify-express-utils";
import {TeamUser, User} from "../../../domain";
import {CHANGE_TEAM_OWNER_DTO_SCHEMA, ChangeTeamOwnerDto} from "../dto/change-team-owner.dto";
import {TeamService} from "../service/team.service";


@controller('/team')
export class TeamController {

    public constructor(
        @inject(UserRepository)
        private readonly userRepository: UserRepository,
        @inject(TeamRepository)
        private readonly teamRepository: TeamRepository,
        @inject(TeamService)
        private readonly teamService: TeamService,
    ) {
    }

    /**
     * Endpoint responsible for adding new member of the team.
     * @param req
     */
    @httpPost('/invite-user', authGuard, validateRequest(ADD_TO_TEAM_DTO))
    public async addToTeam(req) {
        const dto: AddToTeamDto = ADD_TO_TEAM_DTO.parse(req.body);
        const team = await this.teamRepository.findById(dto.teamId);

        if (!team) {
            throw new Error(`Team with ID ${dto.teamId} not found`);
        }

        const user_db: User = await this.userRepository.findByEmail(dto.email);
        const actionUser: User = await this.userRepository.findById(req.userId);

        if (user_db) {
            if (!this.teamService.isTeamOwner(team, actionUser)) {
                throw new Error(`You are not owner of this team.`);
            }
            // if user exist in other teams already just add user to the team
            return await this.teamRepository.assignToTeam(
                user_db,
                team,
                actionUser
            );
        }
        // @ToDo Create account and sent invitation
    }

    @httpGet(':id/members', authGuard)
    public async getTeamMembers(
        @requestParam('teamId') teamId: string
    ): Promise<User[]> {
        const team = await this.teamRepository.findById(teamId);

        if (!team) {
            throw new Error(`Team with ID ${teamId} not found`);
        }

        return await this.teamRepository.findTeamUsers(teamId);
    }

    @httpPatch(':id/change-ownership', authGuard)
    public async changeOwnership(
        @requestParam('teamId') teamId: string,
        req,
    ) {
        const dto: ChangeTeamOwnerDto = CHANGE_TEAM_OWNER_DTO_SCHEMA.parse(req.body);

        const team = await this.teamRepository.findById(teamId);
        if (!team) {
            throw new Error(`Team with ID ${teamId} not found`);
        }

        const teamUsers = await this.teamRepository.findTeamUsers(team.id);

        const actionUser: User = await this.userRepository.findById(req.userId);
        const newOwner = await this.userRepository.findById(dto.userId);


        if(!this.teamService.userIsInTeam(teamUsers, newOwner)) {
            throw new Error(`New owner must be in the team.`);
        }

        if (!this.teamService.isTeamOwner(team, actionUser)) {
            throw new Error(`You are not owner of this team.`);
        }

        await this.teamRepository.changeOwnership(team, newOwner);

        return {
            status: 'success'
        }
    }

    @httpDelete(':id/detach-user/:userId', authGuard)
    public async detachUser(
        @requestParam('teamId') teamId: string,
        @requestParam('userId') userId: string,
        req,
    ) {
        const team = await this.teamRepository.findById(teamId);
        if (!team) {
            throw new Error(`Team with ID ${teamId} not found`);
        }

        const actionUser: User = await this.userRepository.findById(req.userId);
        if (!this.teamService.isTeamOwner(team, actionUser)) {
            throw new Error(`You are not owner of this team.`);
        }

        const teamUser: TeamUser = await this.teamRepository.findTeamUser(teamId, userId);
        await this.teamRepository.removeTeamUser(teamUser, actionUser.id);

    }
}
