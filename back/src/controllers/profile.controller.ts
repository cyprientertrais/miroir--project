import { Controller, Get,Post, Patch, Param, Res,Req, Body, BadRequestException} from '@nestjs/common';
import { profileEnd } from 'console';
import { Dashboard } from 'src/entities/dashboard.entity';
import { Profile } from 'src/entities/profile.entity';
import { ProfileService } from '../services/profile.service';

@Controller('/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfiles() {
    return await this.profileService.getAll();
  }
  @Post()
  
  async postProfile(@Body() profile: Profile): Promise<any>{   
    if(!profile){
      throw new BadRequestException("Profile have been wrong disable");
    }
    return await this.profileService.createOne(profile);
  }
  @Get(':name')
  async getProfile(@Param('name') name: string) {
    return await this.profileService.getOne(name)
  }

  @Get(':name/dashboards')
  async getAllDashboards(@Param('name') name : string){
    return await this.profileService.getAllDashboardsFromProfileService(name)
  }

  @Post(':name/:dashboardName')
  async postDashboardToProfile(@Param('name') name : string, @Param('dashboardName') dashboardName: string) {
    return await this.profileService.createDashboardFromProfileService(name,dashboardName)
  }


  /* @Post(':user/dashboard')
  async postDashboard(@Body() dashboard : Dashboard) : Promise<any>{

  } */

 /*  @Patch(':user/dashboard/:name/:element')
  async patchDashboard(@Body() dashboard: Dashboard) : Promise<any>{
    let dash : Dashboard
    dash = dashboard
    let newUser : Profile
    newUser.pseudo = name
    return await this.profileService.createOne(newUser)
  } */
  
}
