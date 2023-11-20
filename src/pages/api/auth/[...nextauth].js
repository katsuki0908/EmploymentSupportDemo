// [...nextauth].ts
import NextAuth from 'next-auth';
//import NextAuth from 'next-auth/next';
import  CredentialsProvider  from 'next-auth/providers/credentials';
import { useRouter } from 'next/router';
import logger from '../../../../logger';
import { JWT } from 'next-auth/jwt';

export default NextAuth({
  providers: [ 
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        uid: { label: '学籍番号', type: 'text' },
        password: {  label: 'password',  type: 'password' },
      },
      authorize: async (credentials) => {
        const { uid,password } = credentials;
        const token = process.env.token;
        const api = process.env.api;
    
        // データベースからユーザーを検索　福大ダミーapi起動 
        const url = "http://localhost:3000/api/user_database?user_id=" + uid;
        const data = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
         
        const user = await data.json();
        logger.info('ユーザーが正しく認証されました:', user)
        // const response = await fetch(api,{
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({uid:uid,password:password,token:token})});

        // const auth_data = await response.json();
    
        // if (user & auth_data.success == true ) {
        //   // ユーザーが見つかった場合、認証を成功させる
        //   logger.info('認証成功',user)
        //   console.log(user.user_id)
        //   return user;
        // } else {
        //   router.push('/login');
        //   // ユーザーが見つからなかった場合、認証を失敗させる
        //   return Promise.resolve(null)
        // }
        if (user) {
          // ユーザーが見つかった場合、認証を成功させる
          logger.info('認証成功',user)
          console.log(user.user_id)
          return user;
        } else {
          router.push('/login');
          // ユーザーが見つからなかった場合、認証を失敗させる
          return Promise.resolve(null)
        }
      },
    })],

      session: {
        strategy: "jwt",
        maxAge:36000
      },
      
      pages: {
        signIn: '/login',
      },

      callbacks: {
        async jwt({ token, user }) {
          if(user) {
              token.user_id = user.user_id,
              token.user_type = user.user_type
          }
          return token;
        },
        async session({ session, token }) {
          logger.info('session',session)
          logger.info('session',token)
          // セッション情報にユーザーIDを追加
          if(token) {
              session.user.user_id = token.user_id,
              session.user.user_type = token.user_type
            };
          return session;
        }
      }
    })
