// [...nextauth].ts
import NextAuth from "next-auth";
//import NextAuth from 'next-auth/next';
import CredentialsProvider from "next-auth/providers/credentials";
// import logger from "../../../../logger";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        uid: { label: "学籍番号", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        const { uid } = credentials;
        // const token = process.env.token;
        // const api = process.env.api;

        // データベースからユーザーを検索　福大ダミーapi起動
        const url = "http://pbldemo.vercel.app/api/auth/auth?user_id=" + uid;
        const data = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const user = await data.json();
        // logger.info({ msg: "認証中", user: user });
        // const response = await fetch("api",{
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({uid:uid,password:password,token:token})});

        // const auth_data = await response.json();
        // logger.info({msg:'認証中',auth_data:auth_data})
        // if (user && auth_data.success == true ) {
        //   // ユーザーが見つかった場合、認証を成功させる
        //   logger.info({message:'認証成功',user:user.user_id,auth:auth_data})
        //   return user;
        // } else {
        //   // ユーザーが見つからなかった場合、認証を失敗させる
        //   logger.info({message:'認証失敗',user:user.user_id,auth:auth_data})
        //   return null
        // }
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 3600,
  },

  secret: process.env.NEXT_AUTH_SECRET,

  site:process.env.NEXTAUTH_URL,

  url: '/',

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user,account }) {
      if (user) {
        token.user_id = user.user_id;
        token.user_type = user.user_type;
        token.message = account.message;
      }
      // logger.info(token,'token')
      return token;
    },
    async session({ session, token }) {
      // セッション情報にユーザーIDを追加
      if (token.user_type) {
        session.user.user_id = token.user_id;
        session.user.user_type = token.user_type;
        session.message = token.message;
      }
      else {
        session.message = '認証失敗';
        // logger.info(auth_data.message,'認証メッセージ')
      } 
      return session;
    },
    async redirect({ url, baseUrl }) {
      // ログイン後のリダイレクト先を指定
      return url.startsWith(baseUrl) ? url : baseUrl + '/login';
    },}});
