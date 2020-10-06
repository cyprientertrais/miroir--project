import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profile.entity';
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

  async createDashboardFromProfileService(name : string, dashboardName : string){

    let e = await this.getOne(name)
    console.log(await this.getAllDashboardsFromProfileService(name))
    //this.profileRepository.find({pseudo:e.pseudo, dashboards:Dashboard[dashboardName]})
    //fruits.indexOf("Mango") !== -1
    let test : Dashboard[]
    test = await this.getAllDashboardsFromProfileService(name)
    /* console.log(`Test = ${test}
    Test[name] = ${test["name"]}
    `) */
    /* if(test[0][name].includes(dashboardName)){
      throw new BadRequestException("Dashboard already exists");
    }else{ */
      let dashboard = new Dashboard()
      dashboard.name = dashboardName
      e.dashboards.push(dashboard)
      this.profileRepository.save(e)
    
  }

  
}
