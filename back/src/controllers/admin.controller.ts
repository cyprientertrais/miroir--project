import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import SSH2Promise = require('ssh2-promise');

const sshconfig2 = {
  host: '10.3.141.1',
  username: 'ssh_miroir',
  password: 'ssh_miroir',
};

@Controller('/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/wifiscan')
  async getProfiles() {
    const ssh = new SSH2Promise([sshconfig2]);
    const data = await ssh.exec('parse.sh');
    const tab = data.split('\n');
    const res = { wifi: [] };
    for (let i = 0; i < tab.length; i++) {
      if (tab[i].length !== 0) {
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

  @Get('/widgets')
  async fetWidgets() {
    return this.adminService.getAvailableWidgets();
  }

  @Post('/sendWifi')
  async getSendWifi(@Body() body, @Res() response) {
    const ssh = new SSH2Promise([sshconfig2]);
    // A quoi ça sert ??
    // eslint-disable-next-line no-unused-vars
    const data = await ssh.exec(
      ' echo -e network={ ssid=\\"' +
        body.ssid +
        '\\" psk=\\"' +
        body.password +
        '\\"} >> /etc/wpa_supplicant/wpa_supplicant.conf ',
    );

    return response.json(200);
  }
}
