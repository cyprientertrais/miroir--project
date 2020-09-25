import { Column, Entity, PrimaryColumn } from "typeorm";
import { Widget } from "./widget.entity";
@Entity('dashboard')
export class Dashboard{
    @PrimaryColumn() name: string;
    @Column() widgets: Widget[];
    constructor(dashboard?:Partial<Dashboard>){
        Object.assign(this,dashboard);
    }
}