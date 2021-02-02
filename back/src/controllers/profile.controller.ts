import { Dashboard } from '../entities/dashboard.entity';
import {
  Controller,
  Get,
  Post,
  Param,
  Res,
  Body,
  BadRequestException,
  Delete,
  Patch,
} from '@nestjs/common';
import { Profile } from '../entities/profile.entity';
import { ProfileService } from '../services/profile.service';
import {ApiOperation, ApiProperty, ApiTags} from "@nestjs/swagger";

@ApiTags('profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({
    summary : 'Get all profiles'
  })
  @Get('/')
  async getProfiles() {
    return await this.profileService.getAll();
  }

  @ApiOperation({
    summary : 'Get a profile by his name'
  })
  @Get('/:name')
  async getProfile(@Param('name') name: string) {
    return await this.profileService.getOne(name);
  }

  @ApiOperation({
    summary : 'Add a profile',
  })
  @Post('')
  async postProfile(@Body() profile: Profile): Promise<any> {
    if (!profile) {
      throw new BadRequestException('Profile have been wrong disable');
    }
    return await this.profileService.createOne(profile);
  }

  @ApiOperation({
    summary : 'Update a profile',
  })
  @Patch('/:name')
  async updateProfile(
      @Param('name') name: string,
      @Body('name') newName: string,
      @Res() res,
  ) {
    const action = await this.profileService.update(name, newName);
    return res.status(action.status).json(action);
  }

  @ApiOperation({
    summary : 'Delete a profile',
  })
  @Delete('/:name')
  async deleteProfile(@Param('name') name: string, @Res() res) {
    const action = await this.profileService.delete(name);
    return res.status(action.status).json(action);
  }

  @ApiOperation({
    summary : 'Get all dashboards of a profile',
  })
  @Get()
  async getAllDashboards(@Param('name') name: string) {
    return await this.profileService.getAllDashboardsFromProfileService(name);
  }

  @ApiOperation({
    summary : 'Add a dashboard to a profile',
  })
  @Post('/:name')
  async postDashboardToProfile(
    @Body() dashboard: Dashboard,
    @Param('name') name: string,
  ) {
    return await this.profileService.createDashboardFromProfileService(
      dashboard,
      name,
    );
  }

  //TODO TRASH CODE ?

  /* @Post(':name/:dashboard/:widget')
  async postWidgetToDashboard(@Body() widget : Widget, @Param('name') name : string, @Param('dashboard') dashboard : Dashboard){
    return await this.profileService.addWidgetToDashboard(name,dashboard,widget)
  } */

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
