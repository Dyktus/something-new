import { Entity, Column } from 'typeorm';
import {BaseModel} from "../shared";

@Entity('team_subscription')
export class TeamSubscription extends BaseModel {
  @Column({ type: 'uuid' })
  teamId: string;

  @Column({ type: 'uuid' })
  subscriptionId: string;

  @Column({ default: true })
  status: boolean;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column({ default: true })
  renewal: boolean;
}
