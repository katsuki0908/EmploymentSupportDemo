//top page

import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '@/component/big/header'
import Notices from '@/component/big/notice'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>就職支援システム</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={`${inter.className}`}>
        <Header></Header>
        <Notices />
      </main>
    </>
  )
}
