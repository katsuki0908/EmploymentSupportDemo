//キャリア活動のサーバー

import { PrismaClient, Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();
    //キャリアデータの取得（条件としてstudent_idを指定）
    if (req.method === 'GET') {
        const student_id = req.query.student_id as string
        try {
            const result = await prisma.career_action_table.findMany(
                {
                    where: { student_id },
                    include: {
                        action: true,
                        career_path: true,
                    }
                }
            )
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

    //キャリアデータの編集
    else if (req.method === 'PUT') {
        const { career_action_id, student_id, action_date, notes, action_name, name } = req.body;
        try {
            const [createAction, createCareerPath] = await Promise.all([//並列処理
                prisma.action_table.findUnique({ where: { name: action_name } }),
                prisma.career_path_table.findUnique({ where: { name: name } })
            ]);
            const actionId = createAction?.action_id;
            const careerPathId = createCareerPath?.career_path_id;

            const result = await prisma.career_action_table.update({
                where: { career_action_id },
                data: {
                    student_id,
                    action_date: new Date(action_date),
                    notes,
                    career_path_id: careerPathId,
                    action_id: actionId,
                }
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

    //キャリアデータの追加
    else if (req.method === 'POST') {
        try {
            const { student_id, action_date, notes, action_name, name } = req.body;

            const [createAction, createCareerPath] = await Promise.all([
                prisma.action_table.findUnique({ where: { name: action_name } }),
                prisma.career_path_table.findUnique({ where: { name } })
            ]);

            const actionId = createAction?.action_id;
            const careerPathId = createCareerPath?.career_path_id;

            if (actionId && careerPathId !== undefined) {
                const result = await prisma.career_action_table.create({
                    data: {
                        student_id,
                        action_date: new Date(action_date),
                        notes,
                        career_path_id: careerPathId,
                        action_id: actionId,
                    }
                });
                console.log("追加成功");
                res.status(201).json(result);
            } else {
                console.log("追加失敗");
                res.status(400).json({ error: "必要なデータが見つかりません。" });
            }
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

    //キャリアデータの削除
    else if (req.method === 'DELETE') {

        const { career_action_id } = req.body;
        try {
            const result = await prisma.career_action_table.delete(
                { where: { career_action_id } }
            )
            console.log("削除成功");
            res.status(204).end();
        }
        catch (error) {
            console.error("削除失敗", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                res.status(400).json({ error: "リクエストが無効です。" });
            } else {
                res.status(500).json({ error: "データの削除に失敗しました。予期せぬエラーが発生しました。" });
            }
        }

    }

    else {
        console.log("サポートエラー");
        res.status(405).json({ error: "サポートされていないHTTPメソッドです。" });
    }
}