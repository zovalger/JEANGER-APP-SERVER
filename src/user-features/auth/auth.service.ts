import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Messages } from 'src/common/providers/Messages';
import { JwtPayload } from './interface';
import { SessionToken } from './models/session-token.model';
import { TokenTypes } from './enum';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,

    // @InjectModel(UserModel.name)
    // private readonly userModel: Model<User>,

    @InjectModel(SessionToken.name)
    private readonly sessionTokenModel: Model<SessionToken>,
  ) {}

  // login(loginUserDto: LoginUserDto) {
  //   return 'This action adds a new auth';
  // }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userService.getByEmail(email);
    if (!user) throw new BadRequestException(Messages.error.invalidCredentials);

    if (!user.comparePassword(password))
      throw new BadRequestException(Messages.error.invalidCredentials);

    const sessionToken = new this.sessionTokenModel({
      type: TokenTypes.refresh,
      userId: user._id,
    });

    const { expiresIn, token } = this.getJwtToken(
      { id: sessionToken._id.toString() },
      TokenTypes.refresh,
    );

    sessionToken.token = token;
    sessionToken.expiration = new Date(expiresIn);

    await sessionToken.save();

    return sessionToken;
  }

  logout(userId: string) {
    return `This action removes a #${userId} auth`;
  }

  // async profile(user: User) {
  //   return user;
  // }

  async findById(id: string) {
    const sessionToken = await this.sessionTokenModel.findById(id);

    if (!sessionToken) throw new ForbiddenException('Token not valid');

    return sessionToken;
  }

  async validateToken(payload: JwtPayload) {
    const { id } = payload;

    const sessionToken = await this.findById(id);

    if (sessionToken.expiration.getTime() < Date.now())
      throw new UnauthorizedException("The user isn't active");

    return this.userService.findOne(sessionToken.userId.toString());
  }

  private getJwtToken(jwtPayload: JwtPayload, tokenType: TokenTypes) {
    const expiresIn = this.getExpiresInToken(tokenType);

    const token = this.jwtService.sign(jwtPayload, { expiresIn });

    return { token, expiresIn };
  }

  private getExpiresInToken(type: TokenTypes): number {
    return (
      ((type === TokenTypes.refresh
        ? this.configService.get<number>('JWT_REFRESH_EXPIRE_TIME')
        : this.configService.get<number>('JWT_EXPIRE_TIME')) || 1) + Date.now()
    );
  }
}
