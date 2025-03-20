import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {BaseModel} from "../shared";

@Entity('team_billing')
export class TeamBilling extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  teamId: string;

  @Column()
  company_name: string;

  @Column()
  tax_id: string;

  @Column()
  street: string;

  @Column()
  postal_code: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  invoice_email: string;

  @Column({ default: true })
  isActive: boolean;
}
