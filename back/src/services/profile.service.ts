import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profile.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
  @InjectRepository(Profile) 
  private readonly profileRepository: MongoRepository<Profile>)
  {}
  async getAll(): Promise<Profile[]> {
    return await this.profileRepository.find();
  }
  getOne(name: string) : Profile{
    //et profile= new Profile(name,12);
    return null;
  }
  async createOne(profile : Partial<Profile>){
    let e=  this.profileRepository.save(new Profile(profile)).catch(err=>{
      console.log(err)
    });
    return e;
  }
  
}
