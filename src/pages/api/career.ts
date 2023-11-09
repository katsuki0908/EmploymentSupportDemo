//キャリア活動のサーバー

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    //キャリアデータの取得（条件として卒業年度を指定する）
    if (req.method === 'GET') {

        const student_id = req.query.student_id as string
        try {
            const result = await prisma.career_action_table.findMany(
                {
                    where: { student_id },
                }
            )
            console.log(result);
            res.status(200).json(result);
        }
        catch {
            console.log("取得失敗")
            res.status(500).json({ error: "データの取得に失敗しました。" });
        }
    }

    //キャリアデータの編集
    else if (req.method === 'PUT') {
        const obj = JSON.parse(req.body);
        const { career_action_id, student_id, action_date, notes, career_path_id, action_id, } = obj;
        try {
            const result = await prisma.career_action_table.update({
                where: { career_action_id },
                data: {
                    student_id,
                    action_date,
                    notes,
                    career_path_id,
                    action_id,
                }
            });
            if (result === null) {
                res.status(404).json({ message: "データが見つかりませんでした" });
            } else {
                res.status(200).json({ message: "データを更新しました。" });
            }

            res.status(200).json(result)
        }
        catch {
            res.status(500).json({ error: "データの更新に失敗しました。" });
        }
    }

    //キャリアデータの追加
    else if (req.method === 'POST') {
        const obj = JSON.parse(req.body);
        const { student_id, action_date, notes, career_path_id, action_id, } = obj;
        try {
            const result = await prisma.career_action_table.create({
                data: {
                    student_id,
                    action_date,
                    notes,
                    career_path_id,
                    action_id
                }
            })
            res.status(200).json(result);
        }
        catch (err) {
            res.status(500).json({ error: "データの追加に失敗しました。" });
        }
    }

    //キャリアデータの削除
    else if (req.method === 'DELETE') {
        const obj = JSON.parse(req.body)
        const { career_action_id } = obj;
        try {
            const result = await prisma.career_action_table.delete(
                {
                    where: { career_action_id },
                }
            )
            console.log(result);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: "データの削除に失敗しました。" });
        }

    }
}