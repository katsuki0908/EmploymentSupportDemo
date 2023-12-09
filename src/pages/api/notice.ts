//お知らせ機能のサーバー側

import { PrismaClient, Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
// import logger from "../../../logger";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const prisma = new PrismaClient();
  //トップページでの取得
  if (req.method === "GET") {
    const currentTimestamp = new Date(); // 現在の日時
    //**取得件数の指定 */
    try {
      const result = await prisma.notice_table.findMany({
        where: {
          start_date: {
            lte: currentTimestamp, // $lte: Less Than or Equal
          },
          end_date: {
            gt: currentTimestamp, // $gt: Greater Than
          },
        },
        take: 100, // 直近100件を取得
        orderBy: {
          start_date: "desc", // start_dateを降順でソートして直近のものを取得
        },
      });
      if (result.length === 0) {
        // データが見つからない場合
        console.log("データなし");
        res.status(404).json({ message: "お知らせが見つかりませんでした" });
      } else {
        // データがある場合
        // logger.info({ message: "お知らせを取得しました" });
        res.status(200).json(result);
      }
    } catch (error) {
      // logger.info({ message: "お知らせを取得できませんでした", error: error });
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Prismaが特定のエラーを検知した場合
        res.status(400).json({ error: "リクエストが無効です。" });
      } else {
        // その他のエラーの場合
        res
          .status(500)
          .json({
            error:
              "お知らせの取得に失敗しました。予期せぬエラーが発生しました。",
          });
      }
    }
  }

  //お知らせ編集ページでの編集
  else if (req.method === "PUT") {
    const obj = JSON.parse(req.body);
    const { notice_id, title, content, start_date, end_date } = obj;

    try {
      // notice_idに一致するデータを更新
      const result = await prisma.notice_table.update({
        where: { notice_id: notice_id },
        data: {
          title: title,
          content: content,
          start_date: start_date,
          end_date: end_date,
        },
      });
      // logger.info({ message: "お知らせを更新しました", updatedData: result });
      res
        .status(200)
        .json({ message: "お知らせを更新しました。", updatedData: result });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // logger.error({
        //   message: "構文エラーでお知らせの更新に失敗しました",
        //   error: error,
        // });
        res.status(400).json({ error: "リクエストが無効です。" });
      } else {
        // logger.error({
        //   message: "予期せぬエラーでお知らせの更新に失敗しました",
        //   error: error,
        // });
        res
          .status(500)
          .json({
            error:
              "お知らせの更新に失敗しました。予期せぬエラーが発生しました。",
          });
      }
    }
  }

  //お知らせ編集ページでの追加
  else if (req.method === "POST") {
    const obj = JSON.parse(req.body);
    const { title, content, start_date, end_date } = obj;

    try {
      const result = await prisma.notice_table.create({
        data: {
          title,
          content,
          start_date,
          end_date,
        },
      });
      // logger.info({ message: "お知らせを追加しました", updatedData: result });
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // logger.error({
        //   message: "構文エラーでお知らせの追加に失敗しました",
        //   error: error,
        // });
        res.status(400).json({ error: "リクエストが無効です。" });
      } else {
        // logger.error({
        //   message: "予期せぬエラーでお知らせの追加に失敗しました",
        //   error: error,
        // });
        res
          .status(500)
          .json({
            error:
              "お知らせの追加に失敗しました。予期せぬエラーが発生しました。",
          });
      }
    }
  }

  // //お知らせ編集ページでの削除
  else if (req.method === "DELETE") {
    const obj = JSON.parse(req.body);
    const { notice_id } = obj;

    try {
      const result = await prisma.notice_table.delete({
        where: { notice_id },
      });
      // logger.info({ message: "お知らせを削除しました", updatedData: result });
      res.status(204).end();
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // logger.error({
        //   message: "構文エラーでお知らせの削除に失敗しました",
        //   error: error,
        // });
        res.status(400).json({ error: "リクエストが無効です。" });
      } else {
        // logger.error({
        //   message: "予期せぬエラーでお知らせの削除に失敗しました",
        //   error: error,
        // });
        res
          .status(500)
          .json({
            error:
              "お知らせの削除に失敗しました。予期せぬエラーが発生しました。",
          });
      }
    }
  } else {
    // logger.error({
    //   message: "サポートされていないHTTPメソッドでのリクエストです。",
    //   error: req.method,
    // });
    res.status(405).json({ error: "サポートされていないHTTPメソッドです。" });
  }
}
