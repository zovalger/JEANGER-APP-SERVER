import { SetMetadata } from '@nestjs/common';
import { UserPermissions } from 'src/user-features/user/enum';

export const META_PERMISSIONS = 'permission';

export const PermissionProtected = (...args: UserPermissions[]) =>
  SetMetadata(META_PERMISSIONS, args);
