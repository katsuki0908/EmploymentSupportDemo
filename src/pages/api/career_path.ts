//キャリアパスのサーバー

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@/consts/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //取得
    if (req.method === 'GET') {
        try {
            const result = await prisma.career_path_table.findMany()
            console.log(result);
            res.status(200).json(result);
        }
        catch {
            console.log("取得失敗")
            res.status(500).json({ error: "データの取得に失敗しました。" });
        }
    }
    //編集
    else if (req.method === 'PUT') {
        const obj = JSON.parse(req.method);
        const { career_path_id, name, furigana, website } = obj;
        try {
            const result = await prisma.career_path_table.update({
                where: { career_path_id },
                data: {
                    name,
                    furigana,
                    website,
                },
            });

            res.status(200).json(result);
        }
        catch {
            res.status(500).json({ error: "データの更新に失敗しました。" });
        }
    }

    //追加
    else if (req.method === 'POST') {
        const obj = JSON.parse(req.body);
        const { name, furigana, website } = obj;

        try {
            const result = await prisma.career_path_table.create({
                data: {
                    name, 
                    furigana, 
                    website
                }
            });
            res.status(200).json(result);
        }
        catch {
            res.status(500).json({ error: "データの追加に失敗しました。" });
        }
    }

  //削除は実装しない


}