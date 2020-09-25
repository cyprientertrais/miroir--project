import { Dashboard } from "./dashboard.entity";
import { Entity, ObjectIdColumn, Column, PrimaryColumn, ManyToOne } from 'typeorm';
@Entity('profile')
export class Profile{
    @ObjectIdColumn()_id: string;
    @PrimaryColumn() pseudo: string;
    @Column() age: number;
    @Column() dashboards: Dashboard[];
    /*constructor(pseudo: string,age: number){
        this.pseudo=pseudo;
        this.dashboards=[];
        this.age=age;
    }
    */
    constructor(profile?:Partial<Profile>){
        Object.assign(this,profile);
    }
}