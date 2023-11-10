//キャリア活動データベースとの接続

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export async function hendler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    //データの追加
    if (req.method === "POST") {
        try {
            const { student_id, action_date, notes, updated_at, career_path_id, action_id } = req.body;
            const result = await prisma.career_action_table.create({
                data: {
                    student_id, action_date, notes, updated_at, career_path_id, action_id
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
            const {student_id}=req.body;
            const careers = await prisma.career_action_table.findMany({
                where:{student_id}
            });
            res.status(200).json(careers);
        }
        catch (error) {
            res.status(500).json({ error: "データの取得に失敗しました。" });
        }

    }

    
    //データの変更
    else if (req.method === "PUT") {
        try {
            const { career_action_id,student_id, action_date, notes, updated_at, career_path_id, action_id } = req.body;
            const result = await prisma.career_action_table.update({
                where: {career_action_id },
                data: {
                    student_id, action_date, notes, updated_at, career_path_id, action_id
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
            const {career_action_id} = req.body;
            await prisma.career_action_table.delete({
                where:{career_action_id}
            });
            res.status(200).json({ message: "データを削除しました。" });
        }
        catch (error) {
            res.status(500).json({ error: "データの削除に失敗しました。" });
        }
    }
}