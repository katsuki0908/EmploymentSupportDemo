//求人活動のサーバー

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    //取得
    if (req.method === 'GET') {
        const currentTimestamp = new Date(); // 現在の日時
        //const career_path_id: number = parseInt(req.query.career_path_id as string, 10);
        try {
            const result = await prisma.job_listing_table.findMany(
                {
                    where: { 
                        start_date: {
                            lte: currentTimestamp, // $lte: Less Than or Equal
                          },
                          end_date: {
                            gt: currentTimestamp, // $gt: Greater Than
                          },
                    },
                    take: 500, // 直近100件を取得
                    orderBy:{
                        start_date:'desc',
                    },
                    include: {
                        // includeを使用してcareer_path_tableからnameを取得
                        career_path: {
                          select: {
                            name: true,
                          }
                        }
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

    //編集
    //12m3d 変更済み(担当:家永) 変更点:bodyに渡すデータを進路先ID→進路先名前にし、その名前に該当するIDを探しDBを更新する
    else if (req.method === 'PUT') {
        const obj = JSON.parse(req.body);
        const { job_listing_id, application_format, submission_date, visit_date, career_path_id, notes, start_date, end_date } = obj;
        try {
            // const [createCareerPath] = await Promise.all([//並列処理
            //     prisma.career_path_table.findUnique({ where: {name:career_path_name} })
            // ]);
            // const careerPathId = createCareerPath?.career_path_id;
            const result = await prisma.job_listing_table.update({
                where: { job_listing_id },
                data: {
                    application_format,
                    submission_date,
                    visit_date,
                    career_path_id,
                    notes,
                    start_date,
                    end_date
                },
            });
            if (result === null) {
                res.status(404).json({ message: "データが見つかりませんでした" });
            } else {
                res.status(200).json({ message: "データを更新しました。" });
            }
            res.status(200).json(result);   
        }
        catch {
            res.status(500).json({ error: "データの更新に失敗しました。" });
        }
    }

    //追加
    else if (req.method === 'POST') {

        // console.log("req.body = ", req.body);
        // console.log(typeof req.body)

        const obj = JSON.parse(req.body);
        const { application_format, submission_date, visit_date, career_path_id, notes, start_date, end_date } = obj;
        // const { application_format, submission_date, visit_date, career_path_id, notes, start_date, end_date } = req.body;

        try {
            const result = await prisma.job_listing_table.create({
                data: {
                    application_format,
                    submission_date,
                    visit_date,
                    career_path_id,
                    notes,
                    start_date,
                    end_date
                }
            });
            res.status(200).json(result);
        }
        catch {
            res.status(500).json({ error: "データの追加に失敗しました。" });
        }
    }

    //削除
    else if (req.method === 'DELETE') {
        const obj = JSON.parse(req.body);
        const { job_listing_id } = obj;
        
        // const { job_listing_id } = req.body;

        try {
            const result = await prisma.job_listing_table.delete({
                where: { job_listing_id },
            })
            res.status(200).json({ message: "データを削除しました。" });
        }
        catch {
            res.status(500).json({ error: "データの削除に失敗しました。" });
        }

    }
}