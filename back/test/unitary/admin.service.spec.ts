import { Admin } from 'src/entities/admin.entity';
import { MongoRepository } from 'typeorm';
import { AdminService } from '../../src/services/admin.service';

describe('AdminService', () => {
  let adminService: AdminService;

  beforeEach(async () => {
    const adminRepository = <MongoRepository<Admin>>{};
    adminRepository.find = jest.fn().mockResolvedValue(
      [
        {
          orientation: "landscape",
          adminPassword: "password",
          widgets: [
              "Time",
              "Weather"
          ]
      }
    ]);
    adminService = new AdminService(adminRepository);
  })

  describe('checkAdminPassword', () => {
    it('should return "Good password" with a 200 status', async () => {
        const body = { hashedPassword : 'password'}
        const response = await adminService.checkAdminPassword(body);
        expect(response.message).toBe('Good password')
        expect(response.status).toBe(200)
    })

    it('should return "The password mentioned is wrong" with a 400 status', async () => {
        const body = { hashedPassword : 'a07da829fcea6170eac09b3eazze83d104a71bf839a72352b9f6f860e323100e416ba'}
        const response = await adminService.checkAdminPassword(body);
        expect(response.message).toBe('The password mentioned is wrong')
        expect(response.status).toBe(400)
    })
  })
})
