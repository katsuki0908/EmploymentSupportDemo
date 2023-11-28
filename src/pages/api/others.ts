//会社名のその他を変更する機能

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    //会社名にその他を含むキャリア活動を全て取得
    if (req.method === 'GET') {

        try {
            const otherlist = await prisma.career_action_table.findMany(
                {
                    where: {
                        career_path_id: 0,
                    }
                }
            );
            console.log(otherlist);
            res.status(200).json(otherlist);
        }
        catch (error) {
            console.log("取得失敗")
            res.status(500).json({ error: "データの取得に失敗しました。" });
        }
    }

    //既に会社名が追加されているその他のキャリアアクションを修正
    else if(req.method === 'PUT'){
        const obj = JSON.parse(req.body)
        const {career_action_id,career_path_id} = obj;

        try{
            const result = await prisma.career_action_table.update({
                where:{career_action_id},
                data:{
                    career_path_id,
                    notes:"",
                },
            });
            console.log(result)
        }
        catch{
            res.status(500).json({ error: "データの更新に失敗しました。" });
        }
    }

    //会社名の追加とキャリアアクションの修正
    else if(req.method === 'POST'){
        const obj = JSON.parse(req.body);
        const {name,furigana,website,career_action_id} = obj;

        try{
            const careerpath = await prisma.career_path_table.create({
                data:{
                    name,
                    furigana,
                    website,
                },
            });

            const career_path_id = careerpath.career_path_id;
            const result = await prisma.career_action_table.update({
                where:{career_action_id},
                data:{
                    career_path_id,
                    notes:"",
                }
            })

            res.status(200).json(result);
        }
        catch(error){
            res.status(500).json({ error: "会社名の追加に失敗しました。" });
        }

    }


}