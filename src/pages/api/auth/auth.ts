import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/consts/prisma";
import logger from "../../../../logger";


export default async function hendler(req: NextApiRequest, res: NextApiResponse) {


    //データの取得
     if (req.method === "GET") {
        try {
            if (req.query.user_id) {
                // ユーザーIDが指定された場合、特定のユーザーを取得
                const user_id = String(req.query.user_id); // クエリパラメータからユーザーIDを取得
                const user = await prisma.user_table.findUnique({
                    where: { user_id },
                });
                logger.info({message:"ログイン情報取得",user_info:user})
                res.status(200).json(user);
            } 
        }
        catch (error) {
            res.status(500).json({ error: "データの取得に失敗しました。" });
        }
    }
    else return null;
    
}