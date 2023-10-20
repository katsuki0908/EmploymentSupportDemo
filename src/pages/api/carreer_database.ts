//キャリア活動データベースとの接続

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export async function hendler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    //データの追加
    if (req.method === "POST") {
        try {

        }
        catch (error) {
            res.status(500).json({ error: "データの追加に失敗しました。" });
        }

    }


    //データの取得
    else if (req.method === "GET") {
        try {

        }
        catch (error) {
            res.status(500).json({ error: "データの取得に失敗しました。" });
        }

    }

    //データの削除
    else if(req.method === "DELETE"){
        try{

        }
        catch(error){
            res.status(500).json({ error: "データの削除に失敗しました。" });
        }
    }
}