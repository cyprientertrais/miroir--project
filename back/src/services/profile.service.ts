import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../entities/profile.entity';
import { MongoRepository } from 'typeorm';

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
  async delete(name : string ){
    let res = await this.profileRepository.deleteOne({pseudo:name});
    let obj={};
    console.log(res.result);
    if(res.result.ok ==1 && res.result.n==1){
      return {"status":204,"message":"Successfully deleted"};
    }
    return {"status":404,"message":"Error"};
  }
  
}
