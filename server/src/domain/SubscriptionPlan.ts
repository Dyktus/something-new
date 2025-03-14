import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import {BaseModel} from "../shared";

@Entity('subscription_plan')
export class SubscriptionPlan  extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subscriptionName: string;

  @Column('decimal', { precision: 10, scale: 2 })
  pricePerYear: number;

  @Column('decimal', { precision: 10, scale: 2 })
  pricePerMonth: number;

}
