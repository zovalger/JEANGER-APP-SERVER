import {
  ArrayNotEmpty,
  isArray,
  IsArray,
  IsEmail,
  IsEnum,
  isString,
  IsStrongPassword,
} from 'class-validator';
import { UserPermissions } from '../enum';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword(
    {},
    {
      message:
        'The password must contain at least 8 characters with at least one uppercase letter, one lowercase letter, one number and one special character.',
    },
  )
  password: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(UserPermissions, { each: true })
  @Transform(({ value }: TransformFnParams) => {
    if (!isArray(value)) return [];

    if (value.filter((item) => !isString(item)).length) return [];

    const arr = value as string[];

    const uniquesValue: string[] = [];

    arr.map((item) => {
      if (!uniquesValue.includes(item)) uniquesValue.push(item);
    });

    return uniquesValue;
  })
  permissions: UserPermissions[];
}
