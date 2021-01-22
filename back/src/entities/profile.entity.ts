import { Dashboard } from './dashboard.entity';
import { Column, Entity, Index, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

@Entity('profile')
export class Profile {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  @IsNotEmpty()
  @IsString()
  @Index({ unique: true })
  pseudo: string;

  @Column()
  @IsInt()
  age: number;

  @Column()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Dashboard)
  dashboards: Dashboard[];

  constructor(profile?: Profile) {
    Object.assign(this, profile);
  }
}
