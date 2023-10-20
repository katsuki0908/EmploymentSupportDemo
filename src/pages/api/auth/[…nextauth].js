// [...nextauth].ts
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [ 
        Providers.Credentials({
          credentials: {
            uid: { label: '学籍番号', type: 'text' },
            password: {  label: '',  type: 'text' },
          },
          authorize: async (credentials) => {
            const { uid,password } = credentials;
            const token = process.env.token;
    
            // データベースからユーザーを検索　福大ダミーapi起動
                const user = await prisma.User.findUnique({
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
              return Promise.resolve(user);
            } else {
              // ユーザーが見つからなかった場合、認証を失敗させる
              return Promise.resolve(null);
            }
          },
              
  callbacks: {
    async session(session, user) {
      // セッション情報にユーザーIDを追加
      session.user.user_id = user.user_id;
      // セッション情報にユーザー属性を追加d
      session.user.user_type = user.user_type
      return Promise.resolve(session);
    },
  },
}),
]})
