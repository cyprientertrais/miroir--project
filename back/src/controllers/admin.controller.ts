import {
  Controller,
  Get,
  Post,
  Param,
  Res,
  Req,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AdminService } from '../services/admin.service';

import SSH2Promise = require('ssh2-promise');

var sshconfig2 = {
  host: '10.3.141.1',
  username: 'ssh_miroir',
  password: 'ssh_miroir',
};

@Controller('/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/wifiscan')
  async getProfiles() {
    var ssh = new SSH2Promise([sshconfig2]);
    let wifi = '';
    var data = await ssh.exec('parse.sh');
    let tab = data.split('\n');
    let res = { wifi: [] };
    for (let i = 0; i < tab.length; i++) {
      if (tab[i].length != 0) {
        res.wifi.push(tab[i]);
      }
    }
    return res;
  }

  @Post('/checkAdminPassword')
  async checkAdminPassword(@Body() body, @Res() res) {
    console.log(body);
    const infos = await this.adminService.getAll();
    if (infos[0].adminPassword === body.hashedPassword) {
      return res.send(200);
    } else {
      return res.send(403);
    }
  }

  @Get('/orientation')
  async getOrientation() {
    return this.adminService.getOrientation();
  }
}
