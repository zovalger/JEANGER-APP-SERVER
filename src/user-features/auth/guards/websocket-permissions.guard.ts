import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { META_PERMISSIONS } from '../decorators/permission-protected.decorator';
import { UserPermissions } from 'src/user-features/user/enum';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WebSocketPermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions: UserPermissions[] =
      this.reflector.get<UserPermissions[]>(
        META_PERMISSIONS,
        context.getHandler(),
      ) || [];

    const client: Socket = context.switchToWs().getClient<Socket>();

    const user = client.data.user;

    if (!user) throw new WsException('User not found');

    const hasPermission = requiredPermissions.every((permission) =>
      user.permissions.includes(permission),
    );

    if (!hasPermission) throw new WsException('Insufficient permissions');

    return true;
  }
}
