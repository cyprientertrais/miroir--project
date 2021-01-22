import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../entities/profile.entity';
import { MongoRepository } from 'typeorm';
import { Dashboard } from '../entities/dashboard.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: MongoRepository<Profile>,
  ) {}

  async getAll() {
    const e = await this.profileRepository.find();
    return e;
  }

  async getOne(name: string): Promise<Profile> {
    const e = await this.profileRepository.findOne({ pseudo: name });
    if (e === null) {
      throw new NotFoundException();
    }
    return e;
  }

  async createOne(profile: Profile) {
    profile.pseudo =
      profile.pseudo.charAt(0).toUpperCase() + profile.pseudo.slice(1);
    return this.profileRepository.save(new Profile(profile)).catch((err) => {
      throw new BadRequestException(err);
    });
  }

  async getAllDashboardsFromProfileService(name: string) {
    const e = await this.getOne(name);
    return e.dashboards;
  }

  async createDashboardFromProfileService(
    newDashboard: Dashboard,
    name: string,
  ) {
    const profile = await this.getOne(name);
    const dashboardAlreadyExists = this.doesDashboardNameAlreadyExists(
      profile.dashboards,
      newDashboard.name,
    );
    if (dashboardAlreadyExists === true) {
      //TODO
    } else {
      const dash = new Dashboard();
      dash.name = newDashboard.name;
      profile.dashboards.push(newDashboard);
      this.profileRepository.save(profile);
    }
  }

  async delete(name: string) {
    const res = await this.profileRepository.deleteOne({ pseudo: name });
    console.log(res.result);
    if (res.result.ok === 1 && res.result.n === 1) {
      return { status: 204, message: 'Successfully deleted' };
    }
    return { status: 404, message: 'Error' };
  }

  async update(name: string, newName: string) {
    newName = newName.charAt(0).toUpperCase() + newName.slice(1);
    const newvalues = { $set: { pseudo: newName } };
    const res = await this.profileRepository.updateOne(
      { pseudo: name },
      newvalues,
    );
    if (res.result.ok === 1 && res.result.n === 1) {
      return { status: 204, message: 'Successfully deleted' };
    }
    return { status: 404, message: 'Error' };
  }

  doesDashboardNameAlreadyExists(
    dashboards: Dashboard[],
    newDashboardName: string,
  ): boolean {
    let alreadyExists: boolean;
    dashboards.forEach((element) => {
      if (newDashboardName === element.name) {
        alreadyExists = true;
      }
    });
    if (alreadyExists === true) {
      return true;
    } else {
      return false;
    }
  }

  /* async addWidgetToDashboard(name : string, dashboard : Dashboard, newWidgetName : Widget){
      let alreadyExists : boolean;
      let profile : Promise<Profile>

    } */
}
