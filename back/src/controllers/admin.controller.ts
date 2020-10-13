import { Controller, Get,Post,Param, Res,Req, Body, BadRequestException} from '@nestjs/common';

import { Profile } from '../entities/profile.entity';
import { ProfileService } from '../services/profile.service';
let SSH = require('simple-ssh');

var ssh = new SSH({
    host: '10.3.141.1',
    user: 'ssh_miroir',
    pass: 'ssh_miroir'
});


@Controller('/admin')
export class AdminController {
  wifi=""
  constructor() {}

  @Get("/wifiscan")
  async getProfiles() {
    let wifi="";
    ssh.exec('parse.sh', {
      out: (stdout,wifi) => {
        console.log(stdout);
         this.wifi=stdout;
      },
      err: (stderr)=> {
        console.log(stderr);
        this.wifi=stderr; 
    }   
  }).start();
    return this.wifi;
  }


  
}
