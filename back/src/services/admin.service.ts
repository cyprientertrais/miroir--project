import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Admin } from '../entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: MongoRepository<Admin>,
  ) {}

  async getOrientation() {
    let e = await this.adminRepository.find();
    return e.map((element) => {
      return { orientation: element.orientation };
    });
  }

  async getAvailableWidgets() {
    let e = await this.adminRepository.find();
    return e.map((element) => {
      return { widgets: element.widgets};
    });
  }

  async getAll() {
    let e = await this.adminRepository.find();
    return e;
  }
}
