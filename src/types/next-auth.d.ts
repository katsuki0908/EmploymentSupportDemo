import "next-auth";
import { DefaultSession, User,DefaultUser} from "next-auth";
import { JWT,DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      user_id?: string,
      user_type?: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT{
    token: {
      user_id: string,
      user_type: string
    } & DefaultJWT
  } 
}