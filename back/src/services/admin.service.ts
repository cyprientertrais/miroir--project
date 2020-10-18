import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Admin } from 'src/entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
  @InjectRepository(Admin) 
  private readonly adminRepository: MongoRepository<Admin>)
  {}

  async getOrientation() {
    let e = await this.adminRepository.find();
    return e.map(element => {
      return {'orientation':element.orientation}
    })
  }  
}
