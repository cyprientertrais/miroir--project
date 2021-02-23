import { Injectable } from '@nestjs/common'
const Parser = require('rss-parser')
const parser = new Parser()
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }

  async parseRSS() {
    return await parser.parseURL('https://www.france24.com/fr/rss')
  }
}
