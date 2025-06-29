import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { User } from 'src/user-features/user/models/user.model';
import { CustomRequest } from '../interface/custom-request.interface';

export const GetUser = createParamDecorator(
  (
    // parametros al usar el decorador
    data: string,
    // contexto de la peticion
    ctx: ExecutionContext,
  ) => {
    const req: CustomRequest = ctx.switchToHttp().getRequest();

    const user: User = req.user as User;

    if (!user) throw new InternalServerErrorException('user not found request');

    const result = data ? user[data] : user;

    return result;
  },
);
