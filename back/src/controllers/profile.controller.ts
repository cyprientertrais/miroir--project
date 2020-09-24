import { Controller, Get,Post,Param, Res,Req} from '@nestjs/common';
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
  postProfile(@Param('name') name: string,@Res() res,@Req() req): Profile {
    return res.sendStatus(204);
  }
  @Get(':name')
  getProfile(@Param('name') name: string,@Res() res): Profile {
    return res.json(this.profileService.getOne(name));
  }
  
}
