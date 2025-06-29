import { UserPermissions } from 'src/user-features/user/enum';
import { User } from 'src/user-features/user/models/user.model';

export const hasPermission = (
  user: User,
  permission: UserPermissions,
): boolean => user.permissions.includes(permission);
