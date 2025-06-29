import { SetMetadata } from '@nestjs/common';
import { UserPermissions } from 'src/user-features/user/enum';

export const META_PERMISSIONS = 'roles';

export const PermissionProtected = (...args: UserPermissions[]) =>
  SetMetadata(META_PERMISSIONS, args);
