import { Test, TestingModule } from '@nestjs/testing'
import { Profile } from 'src/profile/profile.entity'
import { MongoRepository } from 'typeorm'
//import { ProfileController } from '../../src/controllers/profile.controller'
import { ProfileService } from '../../src/profile/profile.service'


describe('ProfileService', () => {
  
  let profileService: ProfileService;
  let profileRepository = <MongoRepository<Profile>>{}; 
  const pseudo = "Invité";

  beforeEach(async() => {
    profileService = new ProfileService(profileRepository);

    profileRepository.findOne = jest.fn().mockResolvedValue(
        {
            "_id": {
                "$oid": "601951688603f34c084e9ecc"
            },
            "pseudo": "Invité",
            "age": 0,
            "dashboards": [{
                "name": "default",
                "widgets": [{
                    "name": "Time",
                    "position": 1
                }, {
                    "name": "Radio",
                    "position": 2
                }, {
                    "name": "Weather",
                    "position": 3
                }]
            },
            {
                "name": "random",
                "widgets": [{
                    "name": "Radio",
                    "position": 1
                }, {
                    "name": "Time",
                    "position": 2
                }]
            }]
        }
      );
  })

  describe('getOne', () => {

    it('should returns a profile with the pseudo \"Invité\"', async() => {
        const response = await profileService.getOne(pseudo);
        expect(response.pseudo).toBe("Invité");
    });
  })

  describe("getAllDashboards",async() => {
    const response = await profileService.getAllDashboardsFromProfileService(pseudo);

    it('should returns correct names for each dashboards', () => {
        expect(response.dashboards[0].name).toBe("default");
        expect(response.dashboards[1].name).toBe("random");
    });
    
    it('should returns correct user pseudo', () => {
        expect(response.pseudo).toBe("Invité");
    });
  })

});

