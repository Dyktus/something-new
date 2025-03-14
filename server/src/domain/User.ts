import {Column, Entity} from "typeorm";
import {BaseModel} from "../shared";

@Entity()
export class User extends BaseModel {
  @Column()
  username: string

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
}
