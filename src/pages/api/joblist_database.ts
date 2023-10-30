//求人票データベースとの接続

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export async function hendler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    //データの追加
    if (req.method === "POST") {
        try {
            const { application_format, submission_date, visit_date, updated_at, career_path_id, notes } = req.body;
            const result = await prisma.job_listing_table.create({
                data: {
                    application_format,
                    submission_date, visit_date,
                    updated_at,
                    career_path_id,
                    notes
                }
            })
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: "データの追加に失敗しました。" });
        }

    }


    //データの取得
    else if (req.method === "GET") {
        try {
            const joblists = await prisma.job_listing_table.findMany()
        }
        catch (error) {
            res.status(500).json({ error: "データの取得に失敗しました。" });
        }

    }

    //データの変更
    else if (req.method === "PUT") {
        try {
            const { job_listing_id, application_format, submission_date, visit_date, updated_at, career_path_id, notes } = req.body;
            const result = await prisma.job_listing_table.update({
                where: { job_listing_id },
                data: {
                    application_format,
                    submission_date,
                    visit_date,
                    updated_at,
                    career_path_id,
                    notes
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
            const { job_listing_id } = req.body;
            await prisma.job_listing_table.delete({
                where: { job_listing_id },
            });
            res.status(200).json({ message: "データを削除しました。" });
        }
        catch (error) {
            res.status(500).json({ error: "データの削除に失敗しました。" });
        }
    }
}