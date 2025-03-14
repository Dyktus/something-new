import {BaseModel} from "../shared";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('team')
export class Team extends BaseModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    teamName: string;

    @Column({type: 'uuid', unique: true})
    teamOwnerId: string;
}

