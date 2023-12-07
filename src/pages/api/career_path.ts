//キャリアパスのサーバー

import { PrismaClient, Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/consts/prisma";
import logger from "../../../logger";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  //取得
  if (req.method === "GET") {
    try {
      const result = await prisma.career_path_table.findMany();
      if (result.length === 0) {
        // データが見つからない場合
        console.log("データなし");
        res.status(404).json({ message: "データが見つかりませんでした" });
      } else {
        // データがある場合
        //logger.info({ message: 'キャリアパスを取得しました' });
        res.status(200).json(result);
      }
    } catch (error) {
      logger.info({
        message: "キャリアパスを取得できませんでした",
        error: error,
      });
      res
        .status(500)
        .json({
          error: "お知らせの取得に失敗しました。予期せぬエラーが発生しました。",
        });
    }
  }

  //編集
  else if (req.method === "PUT") {
    const obj = JSON.parse(req.method);
    const { career_path_id, name, furigana, website } = obj;
    try {
      const result = await prisma.career_path_table.update({
        where: { career_path_id },
        data: {
          name,
          furigana,
          website,
        },
      });

      logger.info({
        message: "キャリアパスを更新しました",
        updatedData: result,
      });
      res
        .status(200)
        .json({ message: "キャリアパスを更新しました。", updatedData: result });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        logger.error({
          message: "構文エラーでキャリアパスの更新に失敗しました",
          error: error,
        });
        res.status(400).json({ error: "リクエストが無効です。" });
      } else {
        logger.error({
          message: "予期せぬエラーでキャリアパスの更新に失敗しました",
          error: error,
        });
        res
          .status(500)
          .json({
            error: "データの更新に失敗しました。予期せぬエラーが発生しました。",
          });
      }
    }
  }

  //追加
  else if (req.method === "POST") {
    const obj = JSON.parse(req.body);
    const { name, furigana, website } = obj;

    try {
      const result = await prisma.career_path_table.create({
        data: {
          name,
          furigana,
          website,
        },
      });
      logger.info({
        message: "キャリアパスを追加しました",
        updatedData: result,
      });
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        logger.error({
          message: "構文エラーでキャリアパスの追加に失敗しました",
          error: error,
        });
        res.status(400).json({ error: "リクエストが無効です。" });
      } else {
        logger.error({
          message: "予期せぬエラーでキャリアパスの追加に失敗しました",
          error: error,
        });
        res
          .status(500)
          .json({
            error: "データの追加に失敗しました。予期せぬエラーが発生しました。",
          });
      }
    }
  }

  //削除は実装しない
  else {
    logger.error({
      message: "サポートされていないHTTPメソッドでのリクエストです。",
      error: req.method,
    });
    res.status(405).json({ error: "サポートされていないHTTPメソッドです。" });
  }
}
