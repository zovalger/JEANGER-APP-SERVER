import { Request } from 'express';
import { User } from 'src/user-features/user/models/user.model';

export interface CustomRequest extends Request {
  user?: User;
}
