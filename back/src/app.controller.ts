import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import axios from "axios";
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/parse')
  async parseRss(@Body() body, @Res() res) {
    if (body.url) {
      return res.json(await this.appService.parseRSS());
    } else {
      return res.sendStatus(400);
    }
  }
  @Get('/joke')
  async blague(@Body() body, @Res() res) {
    
    const url = "https://blague.xyz/api/joke/random";
    let token="IdAFIzJKMHYjHqDvUvk.4AFf89LHusekRJ2L5cj-SXQ3KJniDJav3v.87p7iXZUc"
    let joke=  await axios.get(url, {  headers: {"Authorization":token}});
    return res.json(joke.data);
}
}