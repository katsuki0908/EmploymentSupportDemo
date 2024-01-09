import "next-auth";
import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      user_id?: string;
      user_type?: string;
    } & DefaultSession["user"];
    message: string;
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
