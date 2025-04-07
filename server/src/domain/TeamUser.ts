import {Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn} from 'typeorm';
import {BaseModel} from "../shared";
import {Team} from "./Team";
import {User} from "./User";

@Entity('team_user')
export class TeamUser extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Team, (team) => team.teamUsers)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @ManyToOne(() => User, (user) => user.teamUsers)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  lastActionUser: string;
}
