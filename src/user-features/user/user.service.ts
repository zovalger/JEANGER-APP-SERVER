import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './models/user.model';
import { Messages, ModuleItems } from 'src/common/providers/Messages';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

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
      console.log(error && null);
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

  async findOne(id: string, options = { password: false }) {
    const { password = false } = options;

    const user =
      // id == adminUserObject._id
      //   ? adminUserObject
      //   :
      await this.userModel.findById(id, { password: password ? 1 : 0 });

    if (!user) throw new Error(Messages.error.notFound(ModuleItems.user));

    return user;
  }

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

  async findAll() {
    return await this.userModel.find({}, { password: 0 }).sort('email');
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { email } = updateUserDto;

    let oldUser: null | UserDocument = null;

    try {
      if (email) oldUser = await this.getByEmail(email);
    } catch (error) {
      console.log(error && null);
    }

    if (oldUser && oldUser._id.toString() !== id) {
      throw new BadRequestException(
        Messages.error.alreadyExist(ModuleItems.user),
      );
    }

    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
      projection: { password: 0 },
    });

    if (!user)
      throw new BadRequestException(Messages.error.notFound(ModuleItems.user));

    return user;
  }

  async updatePassword(
    userId: string,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    const { password, confirmPassword } = updateUserPasswordDto;

    if (password != confirmPassword)
      throw new BadRequestException(Messages.error.passwordsNotMatch());

    const user = await this.findOne(userId, { password: true });

    user.password = password;

    await user.save();
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  // ****************************************************************************
  // 										             getters
  // ****************************************************************************

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
