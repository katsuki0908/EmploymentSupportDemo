//プロフィール機能のサーバー

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    //プロフィールの取得(student_idを指定)
    if (req.method === "GET") {
        try {
            if (req.query.student_id) {
                // 学生IDが指定された場合、特定のユーザーを取得
                const student_id = String(req.query.student_id); // クエリパラメータからユーザーIDを取得
                const student = await prisma.student_table.findUnique({
                    where: { student_id },
                    include:{
                        user: true,
                        cource: true,
                    }
                });
                res.status(200).json(student);
                // console.log(student)
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

    //プロフィール編集ページでの更新(更新内容を指定)
    //新規追加もここで
    else if (req.method === 'PUT') {
        const obj = JSON.parse(req.body);
        const { student_id, gender, affiliation, graduation_year, face_photo, cource_id, personal_address, personal_phone, personal_email, emergency_address, emergency_phone } = obj;
        console.log(obj)
        try {
            const result = await prisma.student_table.update({
                where: { student_id },
                data: {
                    gender,
                    affiliation,
                    graduation_year,
                    face_photo,
                    cource_id,
                    personal_address,
                    personal_phone,
                    personal_email,
                    emergency_address,
                    emergency_phone
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

    else if (req.method === 'POST') {

    }

    else if (req.method === 'DELETE') {

    }

}