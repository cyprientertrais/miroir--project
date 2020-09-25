import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './services/profile.service';
import { ConfigModule } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Profile } from './entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: "mongodb://localhost:27017",
      database: "mirror",
      entities: [
        __dirname + '/entities/*.entity{.ts,.js}',
      ],
      ssl: false,
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
  ],
  controllers: [AppController,ProfileController],
  providers: [AppService,ProfileService],
})
export class AppModule {}
