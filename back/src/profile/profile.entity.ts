import { Dashboard } from '../entities/dashboard.entity'
import { Column, Entity, Index, ObjectIdColumn, PrimaryColumn } from 'typeorm'
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

@Entity('profile')
export class Profile {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  @IsNotEmpty()
  @IsString()
  @Index({ unique: true })
  @ApiProperty()
  pseudo: string;

  @Column()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Dashboard)
  dashboards: Dashboard[] = [
    {
      name: 'default',
      widgets: [
        {
          name: 'Weather',
          position: 2,
        },
        {
          name: 'Time',
          position: 1,
        },
      ],
    },
  ];

  constructor(profile?: Profile) {
    Object.assign(this, profile)
  }
}
