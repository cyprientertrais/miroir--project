import { Body, Controller, Get, Param, Post,Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/parse")
  async parseRss(@Body() body,@Res() res){
    if(body.url){
      return  res.json(await this.appService.parseRSS());
    }else{
      return res.sendStatus(400);
    }
    
  
  }

}
