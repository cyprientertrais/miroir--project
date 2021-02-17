import { Test, TestingModule } from '@nestjs/testing'
import { Profile } from 'src/entities/profile.entity'
import { MongoRepository } from 'typeorm'
//import { ProfileController } from '../../src/controllers/profile.controller'
import { ProfileService } from '../../src/services/profile.service'


describe('ProfileService', () => {
  
  let profileService: ProfileService;

  beforeEach(async() => {

    const profileRepository = <MongoRepository<Profile>>{};
    profileRepository.find = jest.fn().mockResolvedValue(
        [{
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
          }]
      },
      {
        "_id": {
            "$oid": "701951688603f34c084e9ecc"
        },
        "pseudo": "Jean-Pierre",
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
        }]
    }])
  
    profileService = new ProfileService(profileRepository);
  })

  describe('getAll', () => {
    
  })
});

