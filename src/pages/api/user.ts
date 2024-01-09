//ユーザー管理機能のサーバー側

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const prisma = new PrismaClient();

  //学生データの取得（条件として卒業年度を指定する）
  if (req.method === "GET") {
    console.log("接続");
    //Undefinedを許容し、10進数を指定
    const graduation_year: number = parseInt(
      req.query.graduation_year as string,
      10,
    );
    const course_id: number | undefined = req.query.course_id
      ? parseInt(req.query.course_id as string, 10)
      : undefined;
    try {
      const result = await prisma.student_table.findMany({
        where: {
          graduation_year,
          ...(course_id !== undefined && { course_id: course_id }),
        },
        include: {
          // includeを使用してuser_tableからnameを取得
          user: {
            select: {
              name: true,
            },
          },
        },
      });

      if (result.length === 0) {
        // データが見つからなかった場合は404 Not Foundを返す
        res.status(404).json({ error: "データが見つかりませんでした。" });
      } else {
        console.log(result);
        res.status(200).json(result);
      }
    } catch {
      console.log("取得失敗");
      res.status(500).json({ error: "データの取得に失敗しました。" });
    }
  }

  //**学生データの出力 */
  //学生データの編集?
  else if (req.method === "PUT") {
    // const obj = JSON.parse(req.body);
    // const { student_id, gender, grade, graduation_year, face_photo, cource_id, contact1, contact2, affiliation, notes } = obj;
    // try {
    //     const result = await prisma.student_table.update({
    //         where: { student_id },
    //         data: {
    //             gender,
    //             grade,
    //             graduation_year,
    //             face_photo,
    //             cource_id,
    //             contact1,
    //             contact2,
    //             affiliation,
    //             notes
    //         }
    //     });
    //     if (result === null) {
    //         res.status(404).json({ message: "データが見つかりませんでした" });
    //       } else {
    //         res.status(200).json({ message: "データを更新しました。" });
    //       }
    //     res.status(200).json(result)
    // }
    // catch {
    //     res.status(500).json({ error: "データの更新に失敗しました。" });
    // }
  }

  //学生データの追加
  else if (req.method === "POST") {
  }

  //学生データの削除
  else if (req.method === "DELETE") {
  }
}
