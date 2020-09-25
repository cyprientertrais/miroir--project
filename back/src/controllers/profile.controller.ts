import { Controller, Get,Post,Param, Res,Req, Body, BadRequestException} from '@nestjs/common';
import { profileEnd } from 'console';
import { Dashboard } from 'src/entities/dashboard.entity';
import { Profile } from 'src/entities/profile.entity';
import { ProfileService } from '../services/profile.service';

@Controller('/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfiles(@Res() res): Profile[] {
    return res.json(this.profileService.getAll());
  }
  @Post()
  async postProfile(@Body() profile: Partial<Profile>): Promise<any>{
   
   
    if(!profile || !profile.age || !profile.dashboards || !profile.pseudo  ){
      throw new BadRequestException("Profile have been wrong disable");
    }
    return await this.profileService.createOne(profile);
  }
  @Get(':name')
  getProfile(@Param('name') name: string,@Res() res): Profile {
    return res.json(this.profileService.getOne(name));
  }
  
}
