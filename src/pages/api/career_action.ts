import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@/consts/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    //選択肢用のキャリアアクションidの取得（条件としてアクション名を指定する）
    if (req.method === 'GET') {
        try {
            const result = await prisma.action_table.findMany()
            console.log(result);
            res.status(200).json(result);
        }
        catch {
            console.log("取得失敗")
            res.status(500).json({ error: "データの取得に失敗しました。" });
        }
    }
}