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
    if (e === undefined) {
      throw new NotFoundException("User " + name + " not found");
    } else {
      return e;
    }
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
      //TODO : SEND AN INFO TO THE FRONT IN ORDER TO INFORM THAT A USER WITH THE SAME NAME EXIST
    } else {
      const dash = new Dashboard();
      dash.name = newDashboard.name;
      profile.dashboards.push(newDashboard);
      await this.profileRepository.save(profile);
    }
  }

  async delete(name: string) {
    if(name === "Invité"){return {"status":401,"message":"Can't delete guest profile"};}
    const res = await this.profileRepository.deleteOne({ pseudo: name });
    if (res.result.ok === 1 && res.result.n === 1) {
      return { status: 204, message: 'User ' + name + ' successfully deleted' };
    }
    return {
      status: 404,
      message: 'An error occured when trying to remove ' + name,
    };
  }

  async update(name: string, newName: string) {
    newName = newName.charAt(0).toUpperCase() + newName.slice(1);
    const newvalues = { $set: { pseudo: newName } };
    const res = await this.profileRepository.updateOne(
      { pseudo: name },
      newvalues,
    );
    if (res.result.ok === 1 && res.result.n === 1) {
      return {
        status: 204,
        message: 'User ' + name + ' was successfully updated into ' + newName,
      };
    }
    return {
      status: 404,
      message: 'An error occured when trying to update ' + name,
    };
  }

  doesDashboardNameAlreadyExists(
    dashboards: Dashboard[],
    newDashboardName: string,
  ): boolean {
    let alreadyExists: boolean = false;
    dashboards.forEach((element) => {
      if (newDashboardName === element.name) {
        alreadyExists = true;
      }
    });
    return alreadyExists;
  }

  //TODO
  /* async addWidgetToDashboard(name : string, dashboard : Dashboard, newWidgetName : Widget){
      let alreadyExists : boolean;
      let profile : Promise<Profile>

    } */
}
