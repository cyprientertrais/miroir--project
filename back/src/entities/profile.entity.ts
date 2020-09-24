import { Dashboard } from "./dashboard.entity";

export class Profile{
    pseudo: string;
    age: number;
    dashboards: Dashboard[];
    constructor(pseudo: string,age: number){
        this.pseudo=pseudo;
        this.dashboards=[];
        this.age=age;
    }
}