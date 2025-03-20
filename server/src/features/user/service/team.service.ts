import {inject, injectable} from "inversify";
import {RegisterDto} from "../dto/register.dto";
import {User, Team, TeamBilling, TeamSubscription, TeamUser} from "../../../domain";
import {QueryManager} from "../../../shared/database/QueryManager";

@injectable()
export class TeamService {

    public constructor(
        @inject(QueryManager) private queryManager: QueryManager
    ) {
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
        const teamUser = this.queryManager.getManager().getRepository(TeamUser).create({
            teamId: team.id,
            userId: team.teamOwnerId
        });

        await this.queryManager.getManager().save(teamUser);

        return team;
    }


}
