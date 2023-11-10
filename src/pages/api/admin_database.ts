//管理者データベースとの接続

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export async function hendler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    //データの追加

    
    //データの取得


    //データの変更


    //データの削除

}