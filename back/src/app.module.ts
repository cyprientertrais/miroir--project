import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProfileController } from './profile/profile.controller'
import { ProfileService } from './profile/profile.service'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Profile } from './profile/profile.entity'
import { Dashboard } from './entities/dashboard.entity'
import { Widget } from './entities/widget.entity'
import { AdminController } from './admin/admin.controller'
import { AdminService } from './admin/admin.service'
import { Admin } from './admin/admin.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, Dashboard, Widget, Admin]),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      // TODO: a mettre si docker toolbox est installé
      /* url: process.env.HOST
        ? 'mongodb://db:27017'
        : 'mongodb://192.168.99.100:27017',*/
      url: process.env.HOST
        ? 'mongodb://db:27017'
        : 'mongodb://localhost:27017',
      database: 'mirror',
      entities: [__dirname + '/*/*.entity{.ts,.js}'],
      ssl: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController, ProfileController, AdminController],
  providers: [AppService, ProfileService, AdminService],
})
export class AppModule {}
