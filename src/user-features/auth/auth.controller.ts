import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Auth, GetUser } from './decorators';
import { UserDocument } from '../user/models/user.model';
import { GetToken } from './decorators/get-token.decorator';
import { SessionTokenDocument } from './models/session-token.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const session = await this.authService.login(loginUserDto);

    return { data: session };
  }

  @Post('logout')
  @Auth()
  async logout(
    @GetUser() user: UserDocument,
    @GetToken() token: SessionTokenDocument,
  ) {
    await this.authService.logout(user, token);

    return;
  }

  @Post('refresh')
  @Auth()
  async refresh(
    @GetUser() user: UserDocument,
    @GetToken() token: SessionTokenDocument,
  ) {
    const session = await this.authService.refresh(user, token);

    return { data: session };
  }
}
