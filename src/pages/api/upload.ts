// import type { NextApiRequest, NextApiResponse } from "next";
// // import formidable from 'formidable';
// import { IncomingForm } from "formidable";
// import XLSX from "xlsx";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   const form = new IncomingForm();
//   console.log("フォーム", form);

//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       res
//         .status(500)
//         .json({ error: "ファイルの解析中にエラーが発生しました。", err });
//       return;
//     }

//     try {
//       const file = files.file[0];
//       console.log("ファイル", file);
//       if (!file || !file.filepath) {
//         res
//           .status(400)
//           .json({ error: "ファイルがアップロードされていません。" });
//         return;
//       }
//       const workbook = XLSX.readFile(file?.filepath);
//       const sheet = workbook.Sheets[workbook.SheetNames[0]];
//       const data = XLSX.utils.sheet_to_json(sheet);

//       // ファイル名の先頭部分を基に処理を分岐
//       if (file.originalFilename) {
//         const fileNamePrefix = file?.originalFilename.split("_")[0]; // 例: 'テーブル1_データ.xlsx' -> 'テーブル1'
//         console.log("ファイル名", fileNamePrefix);
//         switch (fileNamePrefix) {
//           case "user.xlsx":
//             // テーブル1へのインポート処理
//             await prisma.user_table.createMany({ data });
//             break;
//           case "profile":
//             // テーブル2へのインポート処理
//             await prisma.student_table.createMany({ data });
//             break;
//           // 他のケース
//           default:
//             res.status(400).json({ error: "不明なファイル名です。" });
//             return;
//         }
//       }
//       res
//         .status(200)
//         .json({ message: "ファイルが正常にアップロードされました。" });
//     } catch (error) {
//       res.status(500).json({ error: "内部サーバーエラーが発生しました" });
//       console.error(error);
//     }
//   });
// };
