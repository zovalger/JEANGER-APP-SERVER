import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { User, UserDocument } from 'src/user-features/user/models/user.model';

// todo: mejorar esto y hacerlo seguro

export const GetUserSocket = createParamDecorator(
  (
    // parametros al usar el decorador
    data: string,
    // contexto de la peticion
    ctx: ExecutionContext,
  ) => {
    const req = ctx.switchToWs().getClient();

    const user: User = req.data.user as UserDocument;

    if (!user) throw new InternalServerErrorException('user not found request');

    const result = data ? user[data] : user;

    return result;
  },
);
