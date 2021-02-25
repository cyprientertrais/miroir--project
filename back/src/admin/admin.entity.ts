import { IsNotEmpty, IsString } from 'class-validator'
import { Column, Entity, PrimaryColumn } from 'typeorm'
@Entity('admin')
export class Admin {
  @PrimaryColumn()
  @IsNotEmpty()
  @IsString()
  orientation: string;
  @Column()
  location: string;

  @Column()
  adminPassword: string;

  @Column()
  widgets: string[];

  @Column()
  flowRadio: Object[];

  constructor(admin?: Partial<Admin>) {
    Object.assign(this, admin)
  }
}
