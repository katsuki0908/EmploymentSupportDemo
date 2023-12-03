//会社名のその他を変更する機能

import { PrismaClient, Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    //会社名にその他を含むキャリア活動を全て取得
    if (req.method === 'GET') {

        try {
            const result = await prisma.career_action_table.findMany(
                {
                    where: {
                        career_path_id: 0,
                    }
                }
            );
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
        catch (error) {
            console.log("取得失敗", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // Prismaが特定のエラーを検知した場合
                res.status(400).json({ error: "リクエストが無効です。" });
            } else {
                // その他のエラーの場合
                res.status(500).json({ error: "データの取得に失敗しました。予期せぬエラーが発生しました。" });
            }
        }
    }

    //既に会社名が追加されているその他のキャリアアクションを修正
    else if (req.method === 'PUT') {
        const obj = JSON.parse(req.body)
        const { career_action_id, career_path_id } = obj;

        try {
            const result = await prisma.career_action_table.update({
                where: { career_action_id },
                data: {
                    career_path_id,
                    notes: "",
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

    //会社名の追加とキャリアアクションの修正
    else if (req.method === 'POST') {
        const obj = JSON.parse(req.body);
        const { name, furigana, website, career_action_id } = obj;

        try {
            const careerpath = await prisma.career_path_table.create({
                data: {
                    name,
                    furigana,
                    website,
                },
            });

            const career_path_id = careerpath.career_path_id;
            const result = await prisma.career_action_table.update({
                where: { career_action_id },
                data: {
                    career_path_id,
                    notes: "",
                }
            })
            console.log("追加＆修正成功");
            res.status(201).json({ careerpath, result });
        }
        catch (error) {
            console.error("追加or修正失敗", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                res.status(400).json({ error: "リクエストが無効です。" });
            } else {
                res.status(500).json({ error: "データの追加に失敗しました。予期せぬエラーが発生しました。" });
            }
        }

    }

    else {
        console.log("サポートエラー");
        res.status(405).json({ error: "サポートされていないHTTPメソッドです。" });
    }


}