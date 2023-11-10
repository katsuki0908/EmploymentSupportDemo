//管理者データベースとの接続

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export async function hendler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    //データの追加
    if (req.method === "POST") {
        try {
            const { subject, student_id, admin_id } = req.body;
            const result = await prisma.instruction_table.create({
                data: {
                    subject,
                    student_id,
                    admin_id
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
            if (req.query.student_id) {
                // ユーザーIDが指定された場合、特定のユーザーを取得
                const student_id = String(req.query.student_id); // クエリパラメータからユーザーIDを取得
                const instracts = await prisma.instruction_table.findMany({
                    where: { student_id },
                });
                res.status(200).json(instracts);
            } else if (req.query.admin_id) {
                // ユーザーIDが指定された場合、特定のユーザーを取得
                const admin_id = String(req.query.admin_id); // クエリパラメータからユーザーIDを取得
                const instracts = await prisma.instruction_table.findMany({
                    where: { admin_id },
                });
                res.status(200).json(instracts);
            }
            else {
                // ユーザーIDが指定されていない場合、全てのユーザーデータを取得
                const instracts = await prisma.instruction_table.findMany();
                res.status(200).json(instracts);
            }
        }
        catch (error) {
            res.status(500).json({ error: "データの取得に失敗しました。" });
        }
    }

    //データの変更
    // else if (req.method === "PUT") {
    //     try {
    //         const { subject, student_id, admin_id } = req.body;
    //         const result = await prisma.notice_table.update({
    //             where: { subject, student_id, admin_id },
    //             data: {
                    
    //             },
    //         });
    //         res.status(200).json(result);
    //     } catch (error) {
    //         res.status(500).json({ error: "データの変更に失敗しました。" });
    //     }
    // }

    // //データの削除
    // else if (req.method === "DELETE") {
    //     try {
    //         const { notice_id } = req.body;
    //         await prisma.notice_table.delete({
    //             where: { notice_id },
    //         });
    //         res.status(200).json({ message: "データを削除しました。" });
    //     }
    //     catch (error) {
    //         res.status(500).json({ error: "データの削除に失敗しました。" });
    //     }
    // }
}