import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Admin } from './admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: MongoRepository<Admin>,
  ) {}

  async getOrientation() {
    return await this.adminRepository.findOne({
      select: ['orientation'],
    });
  }

  async getLocation() {
    return await this.adminRepository.findOne({
      select: ['location'],
    });
  }

  async postLocation(body) {
    const newLocation = {
      $set: {
        location: body.location,
      },
    };
    return await this.adminRepository.updateOne({}, newLocation);
  }

  async getAvailableWidgets() {
    return await this.adminRepository.findOne({
      select: ['widgets'],
    });
  }

  async checkAdminPassword(body) {
    const value = await this.adminRepository.findOne({
      select: ['adminPassword'],
    });
    return body.hashedPassword === value.adminPassword;
  }
}
