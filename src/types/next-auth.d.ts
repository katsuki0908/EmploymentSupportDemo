import "next-auth";
import { DefaultSession, User,DefaultUser} from "next-auth";
import { JWT,DefaultJWT } from "next-auth/jwt";
import { Session } from "next-auth";

interface CustomUser {
  user_id?: string;
  user_type: string;
}

// 拡張された Session 型
export interface CustomSession extends Session {
  user: CustomUser & Session["user"]; // 既存の user プロパティを拡張
}

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