import { Injectable } from '@nestjs/common';
import { Profile } from 'src/interfaces/Profile.interface';

@Injectable()
export class ProfileService {
  getAll(): Profile[] {
    return [];
  }
  getOne(name: string) : Profile{
    return new Profile(name,12);
  }
  
}
