import { Entity, Column } from 'typeorm';
import {BaseModel} from "../shared";

@Entity('team_user')
export class TeamUser extends BaseModel {
  @Column({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  teamId: string;

  @Column({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  userId: string;

  @Column({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  lastActionUser: string;
}
