import { Entity, Column } from 'typeorm';
import {BaseModel} from "../shared";

@Entity('team_subscription')
export class TeamSubscription extends BaseModel {
  @Column({ type: 'uuid' })
  teamId: string;

  @Column({ type: 'uuid' })
  subscriptionId: string;
}
