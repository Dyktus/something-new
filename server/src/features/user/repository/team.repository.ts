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

    public async changeOwnership(team: Team, owner: User): Promise<void> {
        team.teamOwnerId = owner.id;
        await team.save();
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
            .findOne({where: {user: {id: user.id}, team: {id: team.id}}});

        if (check) {
            throw new Error(`User ${user.id} already assigned to team ${team.id}`);
        }

        return TeamUser.create({
            team: {id: team.id},
            user: {id: user.id},
            lastActionUser: assigningUser.id
        }).save();
    }

    public async findUserTeams(user: User): Promise<Team[]> {
        return await this.queryManager
            .getManager()
            .getRepository(Team)
            .find({
                where: {
                    teamUsers: {
                        user: {id: user.id},
                    },
                },
                relations: ['teamUsers'],
            });
    }

    public async findTeamUsers(teamId: string): Promise<User[]> {
        const users: User[] = await this.queryManager
            .getManager()
            .getRepository(User)
            .createQueryBuilder('user')
            .innerJoin('user.teamUsers', 'teamUser')
            .where('teamUser.teamId = :teamId', {teamId})
            .where('teamUser.deletedAt IS NULL')
            .getMany();

        return users;
    }

    public async findTeamUser(teamId: string, userId: string): Promise<TeamUser> {
        const teamUser: TeamUser = await this.queryManager
            .getManager()
            .getRepository(TeamUser)
            .findOne({
                where: {
                    user: {id: userId},
                    team: {id: teamId}
                }
            });

        await this.queryManager.release();

        return teamUser;
    }

    public async removeTeamUser(
        teamUser: TeamUser,
        actionUserId: string
    ): Promise<void> {
        teamUser.deletedAt = new Date();
        teamUser.lastActionUser = actionUserId;
        await teamUser.save();
    }
}
