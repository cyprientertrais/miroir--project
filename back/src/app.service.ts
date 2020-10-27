import { Injectable, Res } from '@nestjs/common';
var Parser = require('rss-parser');
var parser = new Parser();
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async parseRSS(){
   return await parser.parseURL('https://www.francetvinfo.fr/titres.rss');
  }
  
}
