import {Entity, Column, ManyToOne} from 'typeorm';
import {BaseModel} from "../shared";
import {Team} from "./Team";

@Entity('team_user')
export class TeamUser extends BaseModel {
  @ManyToOne(() => Team, (team) => team.teamUsers)
  @Column({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  teamId: string;

  @Column({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  userId: string;

  @Column({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  lastActionUser: string;
}
