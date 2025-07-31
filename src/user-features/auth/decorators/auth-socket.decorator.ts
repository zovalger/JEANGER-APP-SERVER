import { applyDecorators, UseGuards } from '@nestjs/common';
import { PermissionProtected } from './permission-protected.decorator';
import { UserPermissions } from 'src/user-features/user/enum';
import { WebSocketAuthGuard } from '../guards/websocket-auth.guard';
import { WebSocketPermissionsGuard } from '../guards/websocket-permissions.guard';

interface Params {
  permissions?: UserPermissions[];
}

export const AuthSocket = (params?: Params) => {
  const { permissions = [] } = params || {};

  return applyDecorators(
    PermissionProtected(...permissions),
    UseGuards(WebSocketAuthGuard, WebSocketPermissionsGuard),
  );
};
