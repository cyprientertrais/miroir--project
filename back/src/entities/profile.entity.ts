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
import {ApiProperty} from "@nestjs/swagger";

@Entity('profile')
export class Profile {
  @ObjectIdColumn()
  @ApiProperty()
  _id: string;

  @PrimaryColumn()
  @IsNotEmpty()
  @IsString()
  @Index({ unique: true })
  @ApiProperty()
  pseudo: string;

  @Column()
  @IsInt()
  @ApiProperty()
  age: number;

  @Column()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Dashboard)
  @ApiProperty()
  dashboards: Dashboard[];

  constructor(profile?: Profile) {
    Object.assign(this, profile);
  }
}
