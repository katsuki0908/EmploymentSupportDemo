import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/consts/prisma";
import { Prisma } from "@prisma/client";
// import logger from "../../../logger";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  //選択肢用のキャリアアクションidの取得（条件としてアクション名を指定する）
  if (req.method === "GET") {
    try {
      const result = await prisma.action_table.findMany();
      if (result.length === 0) {
        // データが見つからない場合
        console.log("データなし");
        res.status(404).json({ message: "データが見つかりませんでした" });
      } else {
        // データがある場合
        //logger.info({ message: 'キャリアアクションを取得しました' });
        res.status(200).json(result);
      }
    } catch (error) {
      console.log("取得失敗", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Prismaが特定のエラーを検知した場合
        res.status(400).json({ error: "リクエストが無効です。" });
      } else {
        // その他のエラーの場合
        res.status(500).json({
          error: "データの取得に失敗しました。予期せぬエラーが発生しました。",
        });
      }
    }
  }
}
