import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { Types } from 'mongoose';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth, GetUser } from '../auth/decorators';
import { UserDocument } from './models/user.model';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { Messages } from 'src/common/providers/Messages';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const data = await this.userService.create(createUserDto);

    return { data };
  }

  @Get()
  @Auth()
  myUser(@GetUser() user: UserDocument) {
    return { data: user };
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch()
  @Auth()
  async updateMyUser(
    @GetUser('_id') userId: Types.ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const data = await this.userService.update(
      userId.toString(),
      updateUserDto,
    );

    return { data };
  }

  @Post('password')
  @Auth()
  async updateMyPassword(
    @GetUser('_id') userId: Types.ObjectId,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    await this.userService.updatePassword(
      userId.toString(),
      updateUserPasswordDto,
    );

    return { message: Messages.success.passwordsChanged() };
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(id);
  // }
}
