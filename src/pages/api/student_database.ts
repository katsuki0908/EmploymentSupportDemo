//学生データベースとの接続
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/consts/prisma";
export default async function hendler(req: NextApiRequest, res: NextApiResponse) {

    //データの追加
    if (req.method === "POST") {
        try {
            const { student_id,gender,is_enrolled,grade,graduation_year,face_photo,updated_at,cource_id,contact1,contact2 } = req.body;
            const result = await prisma.student_table.create({
                data: {
                    student_id,
                    gender,
                    is_enrolled,
                    grade,
                    graduation_year,
                    face_photo,
                    updated_at,
                    cource_id,
                    contact1,
                    contact2
                },
            });
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: "データの追加に失敗しました。" });
        }
    }
    
    else if (req.method === "GET") {
        try {
            if (req.query.student_id) {
                // 学生IDが指定された場合、特定のユーザーを取得
                const student_id = String(req.query.student_id); // クエリパラメータからユーザーIDを取得
                const student = await prisma.student_table.findUnique({
                    where: { student_id },
                    include:{
                        user: true,
                        cource: true,
                        contact_1: true,
                        contact_2: true,
                    }
                });
                res.status(200).json(student);
                console.log(student)
            } else {
                // 学生IDが指定されていない場合、全てのユーザーデータを取得
                const students = await prisma.student_table.findMany();
                res.status(200).json(students);
                console.log(students)
            }
        }
        catch (error) {
            res.status(500).json({ error: "データの取得に失敗しました。" });
        }
    }

    //データの変更
    else if (req.method === "PUT") {
        try {
            const { student_id,gender,is_enrolled,grade,graduation_year,face_photo,updated_at,cource_id,contact1,contact2 } = req.body;
            const result = await prisma.student_table.update({
                where: { student_id },
                data: {
                    gender,
                    is_enrolled,
                    grade,
                    graduation_year,
                    face_photo,
                    updated_at,
                    cource_id,
                    contact1,
                    contact2
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
            const { student_id } = req.body;
            await prisma.student_table.delete({
                where: { student_id },
            });
            res.status(200).json({ message: "データを削除しました。" });
        }
        catch (error) {
            res.status(500).json({ error: "データの削除に失敗しました。" });
        }
    }
}