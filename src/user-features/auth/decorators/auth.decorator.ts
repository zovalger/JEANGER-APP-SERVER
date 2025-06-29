import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PermissionProtected } from './role-protected.decorator';
import { UserPermissionsGuard } from '../guards/user-permission/user-permissionrole.guard';
import { UserVerifiedGuard } from '../guards/user-verified/user-verified.guard';
// import { VerifiedUser } from './verified-user.decorator';
import { UserPermissions } from 'src/user-features/user/enum';

interface Params {
  permissions?: UserPermissions[];
  // withoutVerification?: boolean;
}

export const Auth = (params?: Params) => {
  const {
    permissions = [],
    // withoutVerification = false,
    // familyRole = [],
    // withoutFamilyMember = false,
  } = params || {};

  return applyDecorators(
    PermissionProtected(...permissions),
    // VerifiedUser(withoutVerification),

    UseGuards(AuthGuard(), UserPermissionsGuard, UserVerifiedGuard),
  );
};
