import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserModel } from './models/user.model';

@Module({
  imports: [MongooseModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
