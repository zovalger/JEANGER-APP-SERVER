import { IsStrongPassword } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsStrongPassword(
    {},
    {
      message:
        'The password must contain at least 8 characters with at least one uppercase letter, one lowercase letter, one number and one special character.',
    },
  )
  password: string;

  @IsStrongPassword(
    {},
    {
      message:
        'The password must contain at least 8 characters with at least one uppercase letter, one lowercase letter, one number and one special character.',
    },
  )
  confirmPassword: string;
}
