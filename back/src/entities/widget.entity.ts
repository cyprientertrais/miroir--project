import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Entity, PrimaryColumn } from 'typeorm';

@Entity('widget')
export class Widget {
  @PrimaryColumn()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  position: number;
}
