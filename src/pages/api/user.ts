//ユーザー管理機能のサーバー側

import { PrismaClient, Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();
    //学生データの取得（条件として卒業年度を指定する）
    if (req.method === 'GET') {
        //Undefinedを許容し、10進数を指定
        const graduation_year: number = parseInt(req.query.graduation_year as string, 10);
        const course_id: number | undefined = req.query.course_id ? parseInt(req.query.course_id as string, 10) : undefined;
        try {
            const result = await prisma.student_table.findMany(
                {
                    where: {
                        graduation_year,
                        ...(course_id !== undefined && { cource_id: course_id }),
                    },
                    include: {
                        // includeを使用してuser_tableからnameを取得
                        user: {
                            select: {
                                name: true,
                            }
                        }
                    }
                }
            )

            if (result.length === 0) {
                // データが見つからなかった場合は404 Not Foundを返す
                console.log("データなし");
                res.status(404).json({ error: "データが見つかりませんでした。" });
            } else {
                // データがある場合
                console.log("取得成功");
                res.status(200).json(result);
            }

        }
        catch (error) {
            console.log("取得失敗", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // Prismaが特定のエラーを検知した場合
                res.status(400).json({ error: "リクエストが無効です。" });
            } else {
                // その他のエラーの場合
                res.status(500).json({ error: "データの取得に失敗しました。予期せぬエラーが発生しました。" });
            }
        }
    }

    else {
        console.log("サポートエラー");
        res.status(405).json({ error: "サポートされていないHTTPメソッドです。" });
      }

}