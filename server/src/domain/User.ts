import {Column, Entity, PrimaryGeneratedColumn, Repository} from "typeorm";
import {AppDataSource, BaseModel} from "../shared";

@Entity()
export class User extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column()
  recoverPassword: string

  @Column()
  lastLoginAt: string

  @Column()
  confirmedAt: string;
}

export const UserRepository: Repository<User> = AppDataSource.getRepository(User);
