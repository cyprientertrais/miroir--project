import { Injectable } from '@nestjs/common';
import { Profile } from 'src/entities/profile.entity';

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
