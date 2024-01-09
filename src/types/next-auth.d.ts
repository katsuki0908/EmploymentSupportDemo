import "next-auth";
import { DefaultSession, User, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      user_id?: string;
      user_type?: string;
    } & DefaultSession["user"];
    message:string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token: {
      user_id: string;
      user_type: string;
    } & DefaultJWT;
  }
}
