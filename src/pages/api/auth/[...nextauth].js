// [...nextauth].ts
import NextAuth from 'next-auth';
import  CredentialsProvider  from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';

export default NextAuth({
  providers: [ 
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        uid: { label: '学籍番号', type: 'text' },
        password: {  label: 'password',  type: 'text' },
      },
      authorize: async (credentials) => {
        const prisma = new PrismaClient();
        const { uid,password } = credentials;
        const token = process.env.token;
    
        // データベースからユーザーを検索　福大ダミーapi起動
        const user = await prisma.user_table.findUnique({
          where: { user_id: uid }
        })
        const response = await fetch('https://vhost.cx.tl.fukuoka-u.ac.jp/fuauth_web2/api/auth_dummy',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({uid:uid,password:password,token:token})});

        const auth_data = await response.json();
    
        if (user && auth_data.success == true) {
          // ユーザーが見つかった場合、認証を成功させる
          return Promise.resolve({user,auth_data});
        } else {
          // ユーザーが見つからなかった場合、認証を失敗させる
          return Promise.resolve(null);
        }
      },
      
      session: {
          
      },

      callbacks: {
        async session(session, { user,auth_data }) {
          // セッション情報にユーザーIDを追加
          session.user.user_id = user.user_id;
          // セッション情報にユーザー属性を追加
          session.user.user_type = user.user_type
          // return Promise.resolve(session);
          session.auth_data.success = auth_data.success
          return session;
        },
      },
    }),
  
  ]})
