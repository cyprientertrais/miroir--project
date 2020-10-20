import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../entities/profile.entity';
import { MongoRepository } from 'typeorm';
import { Widget } from 'src/entities/widget.entity';
import { Dashboard } from 'src/entities/dashboard.entity';

@Injectable()
export class ProfileService {
  constructor(
  @InjectRepository(Profile) 
  private readonly profileRepository: MongoRepository<Profile>)
  {}

  async getAll() {
    let e = await this.profileRepository.find();
    return e;
  }

  async getOne(name: string) : Promise<Profile> {
     let e = await this.profileRepository.findOne({pseudo:name});
     if(e==null){
       throw new NotFoundException();
     }
    return e;
  }
  
  async createOne(profile : Profile){
    return this.profileRepository.save(new Profile(profile)).catch(err=>{
      throw new BadRequestException(err);
    });
  }


  async getAllDashboardsFromProfileService(name : string){
    let e = await this.getOne(name)
    return e.dashboards
  }

  async createDashboardFromProfileService(newDashboard : Dashboard,name :string){

    let profile = await this.getOne(name)
    console.log(profile.dashboards)
    const dashboardAlreadyExists = this.doesDashboardNameAlreadyExists(profile.dashboards, newDashboard.name)
    if(dashboardAlreadyExists == true){
      console.log("Dashboard name already exists")
    }else{
      console.log("Dashboard created")
      let dash = new Dashboard()
      dash.name = newDashboard.name
      profile.dashboards.push(newDashboard)
      this.profileRepository.save(profile)
    }
    };
  async delete(name : string ){
    let res = await this.profileRepository.deleteOne({pseudo:name});
    let obj={};
    console.log(res.result);
    if(res.result.ok ==1 && res.result.n==1){
      return {"status":204,"message":"Successfully deleted"};
    }
    return {"status":404,"message":"Error"};
  }
  

 doesDashboardNameAlreadyExists(dashboards : Dashboard[], newDashboardName : string) : boolean{
  console.log(`New dashboard name : ${newDashboardName}`)
  let alreadyExists : boolean;
  dashboards.forEach(element => {
    console.log(`Dashboard name : ${element.name}`)
    if(newDashboardName === element.name){
      console.log("is true")
      alreadyExists = true;
    }
  });
  if(alreadyExists == true){
    return true;
  }else{
    return false;
  }
}
}