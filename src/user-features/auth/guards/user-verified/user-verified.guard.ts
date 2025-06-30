import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  // UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
// import { META_WITHOUTVERIFIED } from '../../decorators/verified-user.decorator';
import { Messages, ModuleItems } from 'src/common/providers/Messages';
import { User } from 'src/user-features/user/models/user.model';
import { CustomRequest } from '../../interface/custom-request.interface';

@Injectable()
export class UserVerifiedGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const withoutVerified: boolean = this.reflector.get(
    //   META_WITHOUTVERIFIED,
    //   context.getHandler(),
    // );

    const req: CustomRequest = context.switchToHttp().getRequest();

    const user = req.user?.data as User;

    if (!user)
      throw new BadRequestException(Messages.error.notFound(ModuleItems.user));

    // if (!withoutVerified && !user.isVerified)
    //   throw new UnauthorizedException(Messages.error.withoutPermission());

    return true;
  }
}
