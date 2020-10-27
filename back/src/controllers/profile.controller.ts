import { Dashboard } from '../entities/dashboard.entity';
import { Controller, Get,Post,Param, Res,Req, Body, BadRequestException, Delete, Patch} from '@nestjs/common';
import { Profile } from '../entities/profile.entity';
import { ProfileService } from '../services/profile.service';
import { Widget } from 'src/entities/widget.entity';

@Controller('/profiles')
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

  @Post(':name/dashboard')
  async postDashboardToProfile(@Body() dashboard : Dashboard,@Param('name') name : string) {
    return await this.profileService.createDashboardFromProfileService(dashboard,name)
  }

  /*@Post(':name/:dashboard/:widget')
  async postWidgetToDashboard(@Body() widget : Widget, @Param('name') name : string, @Param('dashboard') dashboard : Dashboard){
    return await this.profileService.addWidgetToDashboard(name,dashboard,widget)
  }*/

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
  @Patch(":name")
  async updateProfile(@Param('name') name: string,@Body('name') newName: string,@Res() res) {
    let action= await this.profileService.update(name,newName);
    return res.status(action.status).json(action);
  }
  @Delete(':name')
  async deleteProfile(@Param('name') name: string,@Res() res) {
    let action= await this.profileService.delete(name);
    return res.status(action.status).json(action);
  }


  
}
