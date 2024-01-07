//求人活動のサーバー

import { PrismaClient, Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
// import logger from "../../../logger";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const prisma = new PrismaClient();

  //取得
  if (req.method === "GET") {
    const currentTimestamp = new Date(); // 現在の日時
    //const career_path_id: number = parseInt(req.query.career_path_id as string, 10);
    try {
      const result = await prisma.job_listing_table.findMany({
        where: {
          start_date: {
            lte: currentTimestamp, // $lte: Less Than or Equal
          },
          end_date: {
            gt: currentTimestamp, // $gt: Greater Than
          },
        },
        take: 500, // 直近100件を取得
        orderBy: {
          start_date: "desc",
        },
        include: {
          // includeを使用してcareer_path_tableからnameを取得.
          career_path: {
            select: {
              name: true,
            },
          },
        },
      });
      if (result.length === 0) {
        // データが見つからない場合
        console.log("データなし");
        res.status(404).json({ message: "データが見つかりませんでした" });
      } else {
        // データがある場合
        // logger.info({ message: "求人票を取得しました" });
        res.status(200).json(result);
      }
    } catch (error) {
      // logger.info({ message: "求人票を取得できませんでした", error: error });
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Prismaが特定のエラーを検知した場合
        res.status(400).json({ error: "リクエストが無効です。" });
      } else {
        // その他のエラーの場合
        res.status(500).json({ error: "データの取得に失敗しました。" });
      }
    }
  }

  //編集
  //12m3d 変更済み(担当:家永) 変更点:bodyに渡すデータを進路先ID→進路先名前にし、その名前に該当するIDを探しDBを更新する
  else if (req.method === "PUT") {
    const obj = JSON.parse(req.body);
    const {
      job_listing_id,
      application_format,
      submission_date,
      visit_date,
      career_path_id,
      notes,
      start_date,
      end_date,
    } = obj;
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
          end_date,
        },
      });
      // logger.info({ message: "求人票を更新しました", updatedData: result });
      res
        .status(200)
        .json({ message: "データを更新しました。", updatedData: result });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // logger.error({
        //   message: "構文エラーで求人票の更新に失敗しました",
        //   error: error,
        // });
        res.status(400).json({ error: "リクエストが無効です。" });
      } else {
        // logger.error({
        //   message: "構文エラーで求人票の更新に失敗しました",
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

  //追加
  else if (req.method === "POST") {
    // console.log("req.body = ", req.body);
    // console.log(typeof req.body)

    const obj = JSON.parse(req.body);
    const {
      application_format,
      submission_date,
      visit_date,
      career_path_id,
      notes,
      start_date,
      end_date,
    } = obj;
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
          end_date,
        },
      });
      // logger.info({ message: "求人票を追加しました", updatedData: result });
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // logger.error({
        //   message: "求人票でお知らせの追加に失敗しました",
        //   error: error,
        // });
        res.status(400).json({ error: "リクエストが無効です。" });
      } else {
        // logger.error({
        //   message: "予期せぬエラーで求人票の追加に失敗しました",
        //   error: error,
        // });
        res
          .status(500)
          .json({
            error: "求人票の追加に失敗しました。予期せぬエラーが発生しました。",
          });
      }
    }
  }

  //削除
  else if (req.method === "DELETE") {
    const obj = JSON.parse(req.body);
    const { job_listing_id } = obj;

    // const { job_listing_id } = req.body;

    try {
      console.log("a")
      const result = await prisma.job_listing_table.delete({
        where: { job_listing_id },
      });
      console.log(result);
      // logger.info({ message: "求人票を削除しました", updatedData: result });
      res.status(204).end();
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // logger.error({
        //   message: "構文エラーで求人票の削除に失敗しました",
        //   error: error,
        // });
        res.status(400).json({ error: "リクエストが無効です。" });
      } else {
        // logger.error({
        //   message: "予期せぬエラーで求人票の削除に失敗しました",
        //   error: error,
        // });
        console.log(error);
        res.status(500).json({ error: "求人票の削除に失敗しました。予期せぬエラーが発生しました。" });
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
