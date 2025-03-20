import {BaseModel} from "../shared";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { TeamUser } from "./TeamUser";

@Entity('team')
export class Team extends BaseModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    teamName: string;

    @Column({type: 'uuid', unique: true})
    teamOwnerId: string;

    @OneToMany(() => TeamUser, (teamUser) => teamUser.teamId)
    teamUsers: TeamUser[];
}

