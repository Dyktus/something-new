import {inject, injectable} from "inversify";
import {RegisterDto} from "../dto/register.dto";
import {User, Team, TeamBilling, TeamSubscription, TeamUser} from "../../../domain";
import {QueryManager} from "../../../shared/database/QueryManager";
import {TeamRepository} from "../repository/team.repository";

@injectable()
export class TeamService {

    public constructor(
        @inject(QueryManager) private queryManager: QueryManager,
        @inject(TeamRepository)
        private readonly teamRepository: TeamRepository,
    ) {
    }

    public userIsInTeam(users: User[], user: User): boolean {
        return users.filter((u) => u.id === user.id).length > 0;
    }
    public isTeamOwner(team: Team, user: User): boolean {
        return team.teamOwnerId === user.id;
    }
    public async createTeam(
        dto: RegisterDto,
        user: User
    ): Promise<Team> {
        const team: Team = this.queryManager.getManager().getRepository(Team).create({
            teamName: dto.teamData.companyName,
            teamOwnerId: user.id,
        });

        await this.queryManager.getManager().save(team);

        // Store billing data
        const teamBilling = this.queryManager.getManager().getRepository(TeamBilling).create({
            teamId: team.id,
            company_name: dto.teamData.companyName,
            tax_id: dto.teamData.tax_id,
            street: dto.teamData.postalCode,
            postal_code: dto.teamData.postalCode,
            city: dto.teamData.city,
            country: dto.teamData.country,
            invoice_email: dto.teamData.invoice_email,
        });

        await this.queryManager.getManager().save(teamBilling);

        // Assign subscription (@ToDo that should produce event to set up invoice for card payment)
        const teamSubscription = this.queryManager.getManager().getRepository(TeamSubscription).create({
            teamId: team.id,
            subscriptionId: dto.subscriptionPlanId,
            start_date: new Date(),
            end_date: new Date(),
        });

        await this.queryManager.getManager().save(teamSubscription);

        // Assign user to the team
        const teamUser = this.queryManager.getManager()
            .getRepository(TeamUser).create({
            team: { id: team.id },
            user: { id: team.teamOwnerId }
        });

        await this.queryManager.getManager().save(teamUser);

        return team;
    }

    public async currentUserTeams(user: User): Promise<{ownTeamId: string, teams: Array<{id: string, name: string}>}> {
        const teams: Team[] = await this.teamRepository.findUserTeams(user);

        const ownTeamId = teams.length > 0 ? teams.filter(team => team.teamOwnerId === user.id)[0].id : null;

        return {
            ownTeamId,
            teams: teams.map((team) => {
                return {
                    id: team.id,
                    name: team.teamName,
                };
            }),
        }
    }


}
