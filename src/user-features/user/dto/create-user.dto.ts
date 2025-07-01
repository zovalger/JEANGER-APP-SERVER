import {
  IsEmail,
  IsHexColor,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUrl,
  MinLength,
} from 'class-validator';

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

  // @IsArray()
  // @ArrayNotEmpty()
  // @IsEnum(UserPermissions, { each: true })
  // @Transform(({ value }: TransformFnParams) => {
  //   if (!isArray(value)) return [];

  //   if (value.filter((item) => !isString(item)).length) return [];

  //   const arr = value as string[];

  //   const uniquesValue: string[] = [];

  //   arr.map((item) => {
  //     if (!uniquesValue.includes(item)) uniquesValue.push(item);
  //   });

  //   return uniquesValue;
  // })
  // permissions: UserPermissions[];

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  lastname: string;

  @IsHexColor()
  identityColor: string;

  @IsOptional()
  @IsUrl()
  photoURL: string;
}
