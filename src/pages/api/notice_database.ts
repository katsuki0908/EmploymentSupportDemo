//お知らせデータベースとの接続

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    //データの追加
    if (req.method === "POST") {
        try {
            const { title, content, start_date, end_date } = req.body;
            const result = await prisma.notice_table.create({
                data: {
                    title,
                    content,
                    start_date,
                    end_date
                },
            });
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: "データの追加に失敗しました。" });
        }
    }
    
    //データの取得
    else if (req.method === "GET") {
        try {
            const notices = await prisma.notice_table.findMany();
            res.status(200).json(notices);
        }
        catch (error) {
            res.status(500).json({ error: "データの取得に失敗しました。" });
        }
    }

    //データの変更
    else if (req.method === "PUT") {
        try {
            const { notice_id, title, content, start_date, end_date } = req.body;
            const result = await prisma.notice_table.update({
                where: { notice_id },
                data: {
                    title,
                    content,
                    start_date,
                    end_date,
                },
            });
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: "データの変更に失敗しました。" });
        }
    }

    //データの削除
    else if (req.method === "DELETE") {
        try {
            const { notice_id } = req.body;
            await prisma.notice_table.deleteMany({
                where: { 
                    id: {
                        in: notice_id,
                    },
                },
            });
            res.status(200).json({ message: "データを削除しました。" });
        }
        catch (error) {
            res.status(500).json({ error: "データの削除に失敗しました。" });
        }
    }
}