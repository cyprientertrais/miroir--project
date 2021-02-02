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
    const e = await this.adminRepository.find();
    return e.map((element) => {
      return { orientation: element.orientation };
    });
  }

  async getAvailableWidgets() {
    const e = await this.adminRepository.find();
    return e.map((element) => {
      return { widgets: element.widgets };
    });
  }

  async getAll() {
    const e = await this.adminRepository.find();
    return e;
  }

  async checkAdminPassword(body) {
    const infos = await this.getAll();
    if (infos[0].adminPassword === body.hashedPassword) {
      return { status: 200, message: 'Good password' };
    } else {
      return { status: 400, message: 'The password mentioned is wrong' };
    }
  }
}
