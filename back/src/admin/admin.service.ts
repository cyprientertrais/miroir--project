import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Admin } from './admin.entity';
const Parser = require('rss-parser');
const parser = new Parser();

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

  async getFlowRadio() {
    return await this.adminRepository.findOne(
        {
          select: ["flowRadio"]
        }
    )
  }

  async getFlowNews(name: string) {
    const res = await this.adminRepository.findOne(
        {
          select: ["flowNews"]
        }
    )
    const flowNewsArray=JSON.parse(JSON.stringify(res.flowNews));
    const foundNews = flowNewsArray.find(flow => flow.title.toLocaleLowerCase().replace(/ /g, "") === name.toLocaleLowerCase().replace(/ /g, ""));
    if(foundNews === undefined) {
      return "";
    }

    return await parser.parseURL(foundNews.flow);
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
