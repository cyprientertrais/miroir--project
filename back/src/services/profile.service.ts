import { Injectable } from '@nestjs/common';
import { Profile } from 'src/models/profile.models';

@Injectable()
export class ProfileService {
  getAll(): Profile[] {
    return [];
  }
  getOne(name: string) : Profile{
    let profile= new Profile(name,12);
    return profile;
  }
  
}
