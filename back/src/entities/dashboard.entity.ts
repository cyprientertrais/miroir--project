import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Widget } from './widget.entity';
@Entity('dashboard')
export class Dashboard {
  @PrimaryColumn()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Widget)
  widgets: Widget[];

  constructor(dashboard?: Partial<Dashboard>) {
    Object.assign(this, dashboard);
  }
}
