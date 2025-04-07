import {Column, Entity, OneToMany} from "typeorm";
import {BaseModel} from "../shared";
import {TeamUser} from "./TeamUser";


export enum UserRoles {
  ADMIN = "ADMIN",
  USER = "USER",
}

@Entity()
export class User extends BaseModel {
  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ default: null })
  recoverPassword: string

  @Column({ default: null })
  lastLoginAt: string

  @Column({ default: null })
  confirmedAt: string;

  @Column({ default: null})
  roles: string;

  @OneToMany(() => TeamUser, (teamUser) => teamUser.user)
  teamUsers: TeamUser[];
}
