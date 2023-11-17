import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@/consts/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    //選択肢用の進路候補idの取得（条件として会社名を指定する）
    if (req.method === 'GET') {

        const name = req.query.student_id as string
        try {
            const result = await prisma.career_path_table.findMany({
                    where: { name },
                })
            console.log(result);
            res.status(200).json(result);
        }
        catch {
            console.log("取得失敗")
            res.status(500).json({ error: "データの取得に失敗しました。" });
        }
    }
}