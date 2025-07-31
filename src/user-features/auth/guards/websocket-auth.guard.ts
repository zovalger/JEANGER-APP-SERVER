import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WebSocketAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient<Socket>();
    const token = client.handshake.headers['x-access-token'];

    if (!token) throw new WsException('No token provided');

    const { data: user } = await this.authService.deserializer(
      token instanceof Array ? token[0] : token,
    );

    if (!user) throw new WsException('Invalid token');

    client.data.user = user;
    // Attach user to the socket
    return true;
  }
}
