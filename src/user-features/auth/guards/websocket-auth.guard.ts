import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';
import { UserDocument } from 'src/user-features/user/models/user.model';

@Injectable()
export class WebSocketAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient<Socket>();
    const token = client.handshake.headers['x-access-token'];

    if (!token) throw new WsException('No token provided');

    let user: UserDocument | null = null;
    try {
      const { data } = await this.authService.deserializer(
        token instanceof Array ? token[0] : token,
      );

      user = data;
    } catch (error) {
      console.log(error);
      throw new WsException(error?.message || 'error al deserializar');
    }

    if (!user) throw new WsException('Invalid token');

    client.data.user = user;
    // Attach user to the socket
    return true;
  }
}
