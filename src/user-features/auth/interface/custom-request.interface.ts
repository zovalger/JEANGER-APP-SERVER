import { Request } from 'express';
import { User } from 'src/user-features/user/models/user.model';
import { SessionTokenDocument } from '../models/session-token.model';

export interface CustomRequest extends Request {
  user?: { data: User; sessionToken: SessionTokenDocument };
}
