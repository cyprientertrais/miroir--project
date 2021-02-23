import { Admin } from '../../src/admin/admin.entity';
import { MongoRepository } from 'typeorm';
import { AdminService } from '../../src/admin/admin.service';

describe('AdminService', () => {
  let adminService: AdminService;
  let adminRepository = <MongoRepository<Admin>>{};

  beforeEach(async () => {
    adminService = new AdminService(adminRepository);
  })

  describe('getOrientation', () => {
    it('should return "landscape"', async () => {
      adminRepository.findOne = jest.fn().mockResolvedValue(
        {
          orientation: 'landscape'
        }
      );

      const response = await adminService.getOrientation();
      expect(response.orientation).toBe('landscape')
    })
  })

  describe('getAvailableWidgets', () => {
    it('should return widgets Time in first item and Weather in second item', async () => {
      adminRepository.findOne = jest.fn().mockResolvedValue(
        {
          widgets: 
          [
            'Time',
            'Weather'
          ]
        }
      );
      const response = await adminService.getAvailableWidgets();
      expect(response.widgets[0]).toBe('Time')
      expect(response.widgets[1]).toBe('Weather')
    })
  })

  describe('checkAdminPassword', () => {
    it('should return true', async () => {
      adminRepository.findOne = jest.fn().mockResolvedValue(
        {
          adminPassword: 'password'
        }
      );
      const body = { hashedPassword : 'password'}
      const response = await adminService.checkAdminPassword(body);
      expect(response).toBe(true)
    })

    it('should return false', async () => {
      adminRepository.findOne = jest.fn().mockResolvedValue(
        {
          adminPassword: 'password'
        }
      );
      const body = { hashedPassword : 'wrongPassword'}
      const response = await adminService.checkAdminPassword(body);
      expect(response).toBe(false)
    })
  })
})
