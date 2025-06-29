import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { Messages, ModuleItems } from 'src/common/providers/Messages';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    let oldUser: null | User = null;

    try {
      oldUser = await this.getByEmail(email);
    } catch (error) {
      console.log(error);
    }

    if (oldUser)
      throw new BadRequestException(
        Messages.error.alreadyExist(ModuleItems.user),
      );

    const user = new this.userModel(createUserDto);

    await user.save();

    user.password = '';

    return user;
  }

  async findAll() {
    return await this.userModel.find({}, { password: 0 }).sort('email');
  }

  async findOne(id: string) {
    const user =
      // id == adminUserObject._id
      //   ? adminUserObject
      //   :
      await this.userModel.findById(id, { password: 0 });

    if (!user) throw new Error(Messages.error.notFound(ModuleItems.user));

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { email } = updateUserDto;

    // verificar que el email no exista en otro usuario
    if (email) {
      const oldUser = await this.getByEmail(email);

      if (oldUser._id.toString() !== id)
        throw new BadRequestException(
          Messages.error.alreadyExist(ModuleItems.user),
        );
    }

    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });

    if (!user)
      throw new BadRequestException(Messages.error.notFound(ModuleItems.user));

    return user;
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  // ****************************************************************************
  // 										             getters
  // ****************************************************************************

  getByEmail = async (email: string) => {
    const user =
      // email == ADMIN_EMAIL
      //   ? adminUserObject
      //   :
      await this.userModel.findOne({ email });

    if (!user)
      throw new NotFoundException(Messages.error.notFound(ModuleItems.user));

    return user;
  };

  // get_profile_User_service = async (id: string): Promise<UserLoggedDto> => {
  //   let adminUser = id == adminUserObject._id ? adminUserObject : null;
  //   let dbUser = null;

  //   if (!adminUser) {
  //     const a = await userModel.findById(id);

  //     if (!a)
  //       throw new NotFoundException(Messages.error.notFound(ModuleItems.user));

  //     dbUser = a.toJSON();

  //     delete (dbUser as { password?: string }).password;
  //   }

  //   const user = adminUser || dbUser;

  //   if (!user)
  //     throw new NotFoundException(Messages.error.notFound(ModuleItems.user));

  //   return user as unknown as UserLoggedDto;
  // };

  // ****************************************************************************
  // 										             update
  // ****************************************************************************
}
