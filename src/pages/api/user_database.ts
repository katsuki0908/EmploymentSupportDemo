//ユーザーデータベースとの接続

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export async function hendler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();

    //データの追加
    if (req.method === "POST") {
        try {
            const { user_id, name, furigana, user_type } = req.body;
            const result = await prisma.user_table.create({
                data: {
                    user_id,
                    name,
                    furigana,
                    user_type
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
            if (req.query.user_id) {
                // ユーザーIDが指定された場合、特定のユーザーを取得
                const user_id = String(req.query.user_id); // クエリパラメータからユーザーIDを取得
                const user = await prisma.user_table.findUnique({
                    where: { user_id },
                });
                res.status(200).json(user);
            } else {
                // ユーザーIDが指定されていない場合、全てのユーザーデータを取得
                const users = await prisma.user_table.findMany();
                res.status(200).json(users);
            }
        }
        catch (error) {
            res.status(500).json({ error: "データの取得に失敗しました。" });
        }
    }

    //データの変更


    //データの削除
    else if (req.method === "DELETE") {
        try {
            const { user_id } = req.body;
            await prisma.user_table.delete({
                where: { user_id },
            });
            res.status(200).json({ message: "データを削除しました。" });
        }
        catch (error) {
            res.status(500).json({ error: "データの削除に失敗しました。" });
        }
    }
}