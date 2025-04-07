import {inject, injectable} from "inversify";
import {QueryManager} from "../../../shared";
import {SubscriptionPlan} from "../../../domain";

@injectable()
export class SubscriptionRepository {
    public constructor(
        @inject(QueryManager)
        private queryManager: QueryManager
    ) {
    }

    public async findById(subscriptionPlanId: string): Promise<SubscriptionPlan> {
        const subscriptionPlan: SubscriptionPlan = await this.queryManager
            .getManager()
            .getRepository(SubscriptionPlan)
            .findOne({where: {id: subscriptionPlanId}});

        await this.queryManager.release();

        if (!subscriptionPlan) {
            return null;
        } else {
            return subscriptionPlan;
        }
    }
}
