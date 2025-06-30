import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_PERMISSIONS } from '../../decorators/permission-protected.decorator';
import { CustomRequest } from '../../interface/custom-request.interface';
import { User } from 'src/user-features/user/models/user.model';

@Injectable()
export class UserPermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validPermissions: string[] = this.reflector.get(
      META_PERMISSIONS,
      context.getHandler(),
    );

    if (!validPermissions) return true;
    if (!validPermissions.length) return true;

    const req: CustomRequest = context.switchToHttp().getRequest();

    const user = req.user?.data as User;

    if (!user) throw new BadRequestException('User not found');

    for (const permission of user.permissions) {
      if (validPermissions.includes(permission)) return true;
    }

    throw new UnauthorizedException(
      `The user not have the role ${validPermissions.join(', ')}`,
    );
  }
}
