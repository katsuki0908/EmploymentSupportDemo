//求人票

import { useEffect, useState } from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import BusinessIcon from '@mui/icons-material/Business';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Checkbox from '@mui/material/Checkbox';

export default function Joblists(options) {
    // 求人票のデータを管理する変数・関数
    const [joblists, setJoblists] = useState([]);

    // 表示時に実行される処理
    useEffect(() => {
        // 求人票をDBから取ってくる
        const fetchJoblists = async () => {
            try {
                const response = await fetch(
                    "api/joblist", 
                    {
                        method: 'GET',
                    }
                );
                    console.log(response);
                if (response.ok) {
                    const data = await response.json();
                    setJoblists(data);
                }
            } catch (error) {
                console.error("Error while loading data: ", error);
            }
        };

        fetchJoblists();
    }, []);



    // Nested Listが展開されているかどうか
    const [open, setOpen] = useState<{ [id: number]: boolean }>({});

    const handleClick = (id: number) => {
        setOpen(
            {
                ...open,
                [id] : !open[id]
            }
        );
    };


    // チェックボックスの動作
    const [selectedJoblists, setSelectedJoblists] = useState<number[]>([]);
    
    const handleCheckboxChange = (id: number) => {
        const index = selectedJoblists.indexOf(id);
        // 求人票が選択されていなければ
        if (index === -1) {
            const updatedSelectedJoblists = [...selectedJoblists, id];
            setSelectedJoblists( updatedSelectedJoblists );
            setOpen(
                {
                    ...open,
                    [id] : false
                }
            );
        } else {    // 求人票が選択されていれば
            const updatedSelectedJoblists = selectedJoblists.filter( (joblistId) => joblistId !== id );
            setSelectedJoblists( updatedSelectedJoblists );
            setOpen(
                {
                    ...open,
                    [id] : false
                }
            );
        }
    };


    // 表示する内容
    return (
        <div>
            <h1>求人票</h1>

            {/* 掲載期間内の求人票をNested Listに表示する(掲載期間内かどうかはapiで判断) */}
            {joblists.map((joblist) => (
                <List
                    key={joblist.job_listing_id}
                    sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}
                    component="nav"
                >
                    {/* 外側のリスト */}
                    <ListItemButton onClick={() => handleClick(joblist.job_listing_id)}>
                        {/* チェックボックスありなら */}
                        {
                            options.showCheckbox && 
                            (
                                <Checkbox 
                                    checked={selectedJoblists.includes(joblist.job_listing_id)} 
                                    onChange={() => handleCheckboxChange(joblist.job_listing_id)} 
                                    inputProps={{ 'aria-label': 'controlled' }} //要らなそう?
                                />
                            )
                        }
                        <ListItemIcon>
                            <BusinessIcon />
                        </ListItemIcon>
                        <ListItemText primary = {joblist.career_path["name"]} />   {/* 進路候補の名前 */}
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    {/* 内側のリスト */}
                    <Collapse in={open[joblist.job_listing_id]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {[
                                "備考：" + joblist.notes,  // 備考
                                "応募形式：" + joblist.application_format, 
                                "更新日時：" + joblist.updated_at,
                                "送付日：" + joblist.submission_date, 
                                "来学日：" + joblist.visit_date
                            ].map((star, index) => (
                            <ListItem key={index} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary={star} />
                            </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </List>
            ))}

        </div>
    );
}




// お知らせが無かった時のやつ