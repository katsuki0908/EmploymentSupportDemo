//会社名のその他を変更する機能

import { PrismaClient, Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';
import logger from "../../../logger";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    //会社名にその他を含むキャリア活動を全て取得
    if (req.method === 'GET') {

        try {
            const result = await prisma.career_action_table.findMany(
                {
                    where: {
                        career_path_id: 0,
                    }
                }
            );
            if (result.length === 0) {
                // データが見つからない場合
                console.log("データなし");
                res.status(404).json({ message: "その他情報が見つかりませんでした" });
            } else {
                // データがある場合
                logger.info({ message: 'その他情報を取得しました' });
                res.status(200).json(result);
            }
        }
        catch (error) {
            logger.info({ message: 'その他情報を取得できませんでした', error: error });
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // Prismaが特定のエラーを検知した場合
                res.status(400).json({ error: "リクエストが無効です。" });
            } else {
                // その他のエラーの場合
                res.status(500).json({ error: "データの取得に失敗しました。予期せぬエラーが発生しました。" });
            }
        }
    }

    //既に会社名が追加されているその他のキャリアアクションを修正
    else if (req.method === 'PUT') {
        const obj = JSON.parse(req.body)
        const { career_action_id, career_path_id } = obj;

        try {
            const result = await prisma.career_action_table.update({
                where: { career_action_id },
                data: {
                    career_path_id,
                    notes: "",
                },
            });
            logger.info({ message: 'その他を既存のキャリアパスに更新しました', updatedData: result });
            res.status(200).json({ message: "データを更新しました。", updatedData: result });
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                logger.error({ message: '構文エラーで既存のキャリアパスへの更新に失敗しました', error: error });
                res.status(400).json({ error: "リクエストが無効です。" });
            } else {
                logger.error({ message: '予期せぬエラーでキャリアパスへの更新に失敗しました', error: error });
                res.status(500).json({ error: "データの更新に失敗しました。予期せぬエラーが発生しました。" });
            }
        }
    }

    //会社名の追加とキャリアアクションの修正
    else if (req.method === 'POST') {
        const obj = JSON.parse(req.body);
        const { name, furigana, website, career_action_id } = obj;

        try {
            const careerpath = await prisma.career_path_table.create({
                data: {
                    name,
                    furigana,
                    website,
                },
            });

            const career_path_id = careerpath.career_path_id;
            const result = await prisma.career_action_table.update({
                where: { career_action_id },
                data: {
                    career_path_id,
                    notes: "",
                }
            })
            logger.info({ message: '新たなキャリアパスを追加しキャリアアクションを修正しました', updatedData: result });
            res.status(201).json({ careerpath, result });
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                logger.error({ message: '構文エラーでその他の情報の追加に失敗しました', error: error });
                res.status(400).json({ error: "リクエストが無効です。" });
            } else {
                logger.error({ message: '予期せぬエラーでその他の情報の追加に失敗しました', error: error });
                res.status(500).json({ error: "データの追加に失敗しました。予期せぬエラーが発生しました。" });
            }
        }

    }

    else {
        logger.error({ message: 'サポートされていないHTTPメソッドでのリクエストです。', error: req.method });
        res.status(405).json({ error: "サポートされていないHTTPメソッドです。" });
    }


}