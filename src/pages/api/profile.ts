//プロフィール機能のサーバー

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    //プロフィールの取得(student_idを指定)
    if (req.method === 'GET') {

        const student_id = req.query.student_id as string
        try {
            const result = await prisma.student_table.findMany(
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

    //プロフィール編集ページでの更新(更新内容を指定)
    //新規追加もここで
    else if (req.method === 'PUT') {
        const obj = JSON.parse(req.body);
        const { student_id, gender, grade, graduation_year, face_photo, cource_id, contact1, contact2, affiliation, notes } = obj;
        console.log(obj)
        try {
            const result = await prisma.student_table.update({
                where: { student_id },
                data: {
                    gender,
                    grade,
                    graduation_year,
                    face_photo,
                    cource_id,
                    contact1,
                    contact2,
                    affiliation,
                    notes
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

    else if(req.method === 'POST'){

    }

    else if(req.method === 'DELETE'){

    }

}