import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../entities/profile.entity';
import { MongoRepository } from 'typeorm';
import { Admin } from 'src/entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
  @InjectRepository(Admin) 
  private readonly adminRepository: MongoRepository<Admin>)
  {}

  async getAll() {
    let e = await this.adminRepository.find();
    return e;
  }  
}
