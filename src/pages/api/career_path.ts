//キャリアパスのサーバー

import { PrismaClient, Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@/consts/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //取得
    if (req.method === 'GET') {
        try {
            const result = await prisma.career_path_table.findMany()
            if (result.length === 0) {
                // データが見つからない場合
                console.log("データなし");
                res.status(404).json({ message: "データが見つかりませんでした" });
            } else {
                // データがある場合
                console.log("取得成功");
                res.status(200).json(result);
            }
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

            console.log("更新成功");
            res.status(200).json({ message: "データを更新しました。", updatedData: result });

        }
        catch (error) {
            console.log("更新失敗", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                res.status(400).json({ error: "リクエストが無効です。" });
            } else {
                res.status(500).json({ error: "データの更新に失敗しました。予期せぬエラーが発生しました。" });
            }
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
            console.log("追加成功");
            res.status(201).json(result);
        }
        catch (error) {
            console.error("追加失敗", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                res.status(400).json({ error: "リクエストが無効です。" });
            } else {
                res.status(500).json({ error: "データの追加に失敗しました。予期せぬエラーが発生しました。" });
            }
        }
    }

    //削除は実装しない

    else {
        console.log("サポートエラー");
        res.status(405).json({ error: "サポートされていないHTTPメソッドです。" });
      }

}