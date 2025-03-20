import {inject, injectable} from "inversify";
import {QueryManager} from "../../../shared";
import {Team, TeamUser, User} from "../../../domain";

@injectable()
export class TeamRepository {
    public constructor(
        @inject(QueryManager)
        private queryManager: QueryManager
    ) {
    }

    public async findById(teamId: string): Promise<Team> {
        const team: Team = await this.queryManager
            .getManager()
            .getRepository(Team)
            .findOne({where: {id: teamId}});

        await this.queryManager.release();

        if (!team) {
            return null;
        } else {
            return team;
        }
    }

    public async assignToTeam(
        user: User,
        team: Team,
        assigningUser: User,
    ): Promise<TeamUser> {
        // Check if user is already assigned
        const check = await this.queryManager
            .getManager()
            .getRepository(TeamUser)
            .findOne({where: {userId: user.id, teamId: team.id}});

        if (check) {
            throw new Error(`User ${user.id} already assigned to team ${team.id}`);
        }

        if (assigningUser.id !== team.teamOwnerId) {
            throw new Error(`You cannot perform actions on ${team.id} as you are not the owner of the team.`);
        }

        return TeamUser.create({
            teamId: team.id,
            userId: user.id,
            lastActionUser: assigningUser.id
        }).save();
    }

    public async findUserTeams(user: User): Promise<Team[]> {
        const teams = await this.queryManager
            .getManager()
            .getRepository(Team)
            .find({
                where: {
                    teamUsers: {
                        userId: user.id,
                    },
                },
                relations: ['teamUsers'],
            });

        await this.queryManager.release();

        return teams;
    }
}
