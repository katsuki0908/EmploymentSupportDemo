//キャリア活動のサーバー

import { PrismaClient, Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
// import logger from "../../../logger";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const prisma = new PrismaClient();
  //キャリアデータの取得（条件としてstudent_idを指定）
  if (req.method === "GET") {
    const student_id = req.query.student_id as string;
    try {
      const result = await prisma.career_action_table.findMany({
        where: { student_id },
        include: {
          action: true,
          career_path: true,
        },
      });
      if (result.length === 0) {
        // データが見つからない場合
        console.log("データなし");
        res.status(404).json({ message: "データが見つかりませんでした" });
      } else {
        // データがある場合
        // logger.info({ message: "お知らせを取得しました" });
        res.status(200).json(result);
      }
    } catch (error) {
      // logger.info({
      //   message: "キャリアデータを取得できませんでした",
      //   error: error,
      // });
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Prismaが特定のエラーを検知した場合
        res.status(400).json({ error: "リクエストが無効です。" });
      } else {
        // その他のエラーの場合
        res
          .status(500)
          .json({
            error:
              "キャリアの取得に失敗しました。予期せぬエラーが発生しました。",
          });
      }
    }
  }

  //キャリアデータの編集
  else if (req.method === "PUT") {
    const {
      career_action_id,
      student_id,
      action_date,
      notes,
      career_path_id,
      action_id,
    } = req.body;
    try {
      const result = await prisma.career_action_table.update({
        where: { career_action_id },
        data: {
          student_id,
          action_date: new Date(action_date),
          notes,
          career_path_id,
          action_id,
        },
      });
      // logger.info({ message: "キャリアを更新しました", updatedData: result });
      res
        .status(200)
        .json({ message: "キャリアを更新しました。", updatedData: result });
    } catch (error) {
      console.log("更新失敗", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // logger.error({
        //   message: "構文エラーでキャリアの更新に失敗しました",
        //   error: error,
        // });
        res.status(400).json({ error: "リクエストが無効です。" });
      } else {
        // logger.error({
        //   message: "予期せぬエラーでキャリアの更新に失敗しました",
        //   error: error,
        // });
        res
          .status(500)
          .json({
            error: "データの更新に失敗しました。予期せぬエラーが発生しました。",
          });
      }
    }
  }

  //キャリアデータの追加
  else if (req.method === "POST") {
    try {
      const { student_id, action_date, notes, career_path_id, action_id } =
        req.body;

      const result = await prisma.career_action_table.create({
        data: {
          student_id,
          action_date: new Date(action_date),
          notes,
          career_path_id,
          action_id,
        },
      });
      // logger.info({ message: "を追加しました", updatedData: result });
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // logger.error({
        //   message: "構文エラーでキャリア追加に失敗しました",
        //   error: error,
        // });
        res.status(400).json({ error: "リクエストが無効です。" });
      } else {
        // logger.error({
        //   message: "予期せぬエラーでキャリアの追加に失敗しました",
        //   error: error,
        // });
        res
          .status(500)
          .json({
            error: "データの追加に失敗しました。予期せぬエラーが発生しました。",
          });
      }
    }
  }

  //キャリアデータの削除
  else if (req.method === "DELETE") {
    const { career_action_id } = req.body;
    try {
      const result = await prisma.career_action_table.delete({
        where: { career_action_id },
      });
      // logger.info({ message: "キャリアを削除しました", updatedData: result });
      res.status(204).end(result);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // logger.error({
        //   message: "構文エラーでキャリアの削除に失敗しました",
        //   error: error,
        // });
        res.status(400).json({ error: "リクエストが無効です。" });
      } else {
        // logger.error({
        //   message: "予期せぬエラーでキャリアの削除に失敗しました",
        //   error: error,
        // });
        res
          .status(500)
          .json({
            error: "データの削除に失敗しました。予期せぬエラーが発生しました。",
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
