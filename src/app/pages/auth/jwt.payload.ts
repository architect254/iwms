import { User } from "../users/user.model";

export interface JwtPayload {
  user: User;
}
