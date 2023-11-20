//お知らせ機能のサーバー側

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const prisma = new PrismaClient();
  //トップページでの取得
  if (req.method === 'GET') {
    const currentTimestamp = new Date(); // 現在の日時
    //**取得件数の指定 */
    try {

      const notices = await prisma.notice_table.findMany(
        {
          where: {
            start_date: {
              lte: currentTimestamp, // $lte: Less Than or Equal
            },
            end_date: {
              gt: currentTimestamp, // $gt: Greater Than
            },
          },
          take: 50, // 直近50件を取得
          orderBy: {
            start_date: 'desc', // start_dateを降順でソートして直近のものを取得
          },
        }
      );

      console.log(notices);
      res.status(200).json(notices);

    }
    catch (error) {
      console.log("取得失敗")
      res.status(500).json({ error: "データの取得に失敗しました。" });
    }
  }

  //お知らせ編集ページでの編集
  else if (req.method === 'PUT') {
    const obj = JSON.parse(req.body)
    const { notice_id, title, content, start_date, end_date } = obj;
    //**NULLの時の処理 */
    console.log(obj)
    try {
      // notice_idに一致するデータを更新
      const updatedNotice = await prisma.notice_table.update({
        where: { notice_id: notice_id },
        data: {
          title: title,
          content: content,
          start_date: start_date,
          end_date: end_date,
        },
      });

      if (updatedNotice === null) {
        res.status(404).json({ message: "データが見つかりませんでした" });
      } else {
        res.status(200).json({ message: "データを更新しました。" });
      }

      res.status(200).json(updatedNotice);
    } catch (error) {
      res.status(500).json({ error: "データの更新に失敗しました。" });
    }
  }

  // //お知らせ編集ページでの追加
  else if (req.method === 'POST') {

    const obj = JSON.parse(JSON.stringify(req.body)) //requestをJSONに変換
    const { title, content, start_date, end_date } = obj;

    try {
      const result = await prisma.notice_table.create({
        data: {
          title,
          content,
          start_date,
          end_date
        },
      });
      res.status(200).json(result);
    }
    catch (error) {
      res.status(500).json({ error: "データの追加に失敗しました。" });
    }
  }

  // //お知らせ編集ページでの削除
  else if (req.method === 'DELETE') {
    const { notice_id } = req.body; // req.body는 이미 JSON 객체로 파싱된 상태
    console.log(req.body);
    console.log(typeof req.body);
  
    try {
      const result = await prisma.notice_table.delete({
        where: { notice_id },
      });
  
      if (result === null) {
        res.status(404).json({ message: "データが見つかりませんでした" });
      } else {
        res.status(200).json({ message: "データを削除しました。" });
      }
    } catch (error) {
      res.status(500).json({ error: "データの削除に失敗しました。" });
    }
  }
}