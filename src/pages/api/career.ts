//キャリア活動のサーバー

import { PrismaClient } from "@prisma/client";
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
                    include:{
                        action: true,
                        career_path: true,
                    }
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
        const { career_action_id, student_id, action_date, notes, action_name, name } = req.body;
        try {
            const [createAction, createCareerPath] = await Promise.all([//並列処理
                prisma.action_table.findUnique({ where: { name:action_name } }),
                prisma.career_path_table.findUnique({ where: { name:name } })
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
            if (result === null) {
                res.status(404).json({ message: "データが見つかりませんでした" });
            } else {
                res.status(200).json({ message: "データを更新しました。" });
            }
            res.status(200).json(result)
        }
        catch (error){
            res.status(500).json({ error: "データの更新に失敗しました。" });
            console.error('編集エラー',error);
        }
    }

    //キャリアデータの追加
    else if (req.method === 'POST') {
        try {
            const { student_id, action_date, notes, action_name, name } = req.body;
    
            if(!action_name || !name) {
                return res.status(400).json({ message: "action_nameとnameは必須です" });
            }
    
            const [createAction, createCareerPath] = await Promise.all([
                prisma.action_table.findUnique({ where: { name: action_name } }),
                prisma.career_path_table.findUnique({ where: { name } })
            ]);
    
            const actionId = createAction?.action_id;
            const careerPathId = createCareerPath?.career_path_id;
    
            if(actionId && careerPathId !== undefined){
                const result = await prisma.career_action_table.create({
                    data: {
                        student_id,
                        action_date: new Date(action_date),
                        notes,
                        career_path_id: careerPathId,
                        action_id: actionId,      
                    }
                });
                res.status(200).json(result);
            } else {
                res.status(400).json({ error: "必要なデータが見つかりません。" });
            }
        }
        catch (err) {
            res.status(500).json({ error: "データの追加に失敗しました。" });
            console.error("データ追加エラー", err);
        }
    }
    
    //キャリアデータの削除
    else if (req.method === 'DELETE') {

        const { career_action_id } = req.body;
        try {
            const result = await prisma.career_action_table.delete(
                { where: { career_action_id } }
            )
            console.log(result);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: "データの削除に失敗しました。" });
            console.error(error);
        }

    }
}