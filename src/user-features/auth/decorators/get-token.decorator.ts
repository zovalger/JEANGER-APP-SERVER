import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { CustomRequest } from '../interface/custom-request.interface';
import { SessionTokenDocument } from '../models/session-token.model';

export const GetToken = createParamDecorator(
  (
    // parametros al usar el decorador
    data: string,
    // contexto de la peticion
    ctx: ExecutionContext,
  ) => {
    const req: CustomRequest = ctx.switchToHttp().getRequest();

    const token = req.user?.sessionToken as SessionTokenDocument;

    if (!token)
      throw new InternalServerErrorException('user not found request');

    const result = data ? token[data] : token;

    return result;
  },
);
