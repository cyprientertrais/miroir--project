import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './services/profile.service';

@Module({
  imports: [],
  controllers: [AppController,ProfileController],
  providers: [AppService,ProfileService],
})
export class AppModule {}
