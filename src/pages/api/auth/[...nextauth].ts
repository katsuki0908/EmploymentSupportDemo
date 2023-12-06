// [...nextauth].ts
import NextAuth from 'next-auth';
//import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import logger from '../../../../logger';
import { user_table } from '@prisma/client';
import { CustomSession } from '@/types/next-auth';

interface Token {
  user_id: string;
  user_type: string;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        uid: { label: '学籍番号', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      authorize: async (credentials?: Record<string, string>) => {
        // const { uid,password } = credentials;
        const token = process.env.token;
        const api = process.env.api as string;
        const auth_api = process.env.auth_api;

        if (!credentials) {
          return null;
        }

        // データベースからユーザーを検索　福大ダミーapi起動 
        const url = auth_api + credentials.uid;
        const data = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const user = await data.json();
        // const response = await fetch(api,{//ダミー認証のコードなので家で作業する人はコメントアウト必須60行目まで
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({uid:credentials.uid,password:credentials.password,token:token})});

        // const auth_data = await response.json();

        // if (user && auth_data.success == true ) {
        //   // ユーザーが見つかった場合、認証を成功させる
        //   logger.info('認証成功',user)
        //   console.log(user.user_id)
        //   return user;
        // } else {
        //   // ユーザーが見つからなかった場合、認証を失敗させる
        //   return Promise.resolve(null)
        // }
        if (user) {//代わりにここを使わないと家で作業する場合はだめです。
          // ユーザーが見つかった場合、認証を成功させる
          // logger.info('認証成功',user)
          console.log(user.user_id)
          logger.info({ msg: 'セッション', user: user })

          return user;
        } else {
          // ユーザーが見つからなかった場合、認証を失敗させる
          return null
        }
      },
    })],

  session: {
    strategy: 'jwt' as const,
    maxAge: 36000,
  },

  secret: process.env.NEXT_AUTH_SECRET,

  site: process.env.NEXTAUTH_URL,

  pages: {
    signIn: '/login',
  },

  callbacks: {
    async jwt({ token, user }: { token: Token; user: user_table }) {
      if (user) {
        token.user_id = user.user_id,
          token.user_type = user.user_type
      }
      return token;
    },
    async session({ session, token }: { session: CustomSession; token: Token }) {

      const customSession = session as CustomSession
      // セッション情報にユーザーIDを追加
      if (token) {
        customSession.user = {
          ...customSession.user,
          user_id: token.user_id ?? session.user.user_id, // オプショナルチェーンを使用
          user_type: token.user_type,
        };
        return customSession
      }
    },
  },
};

// サーバーサイドセッションで使用するためのオプション（callbacksを除外）
export const serverAuthOptions = {
  ...authOptions,
  session: {
    strategy: 'jwt' as 'jwt',
    maxAge: 36000,
  },
};

export default NextAuth(authOptions);