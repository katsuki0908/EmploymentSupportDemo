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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import EditJoblistDialog from '@/component/big/edit_joblist_dialog'; 

interface Joblist {
    application_format: string;
    career_path: any; //JSON型の扱い型分からないので、any
    career_path_id: number;
    end_date: Date;
    job_listing_id: number;
    notes: string;
    start_date: Date;
    submission_date: Date;
    updated_at:Date;
    visit_date: Date;
  }

export default function Joblists(options) {
    // 求人票のデータを管理する変数・関数
    const [joblists, setJoblists] = useState<Joblist[]>([]);

    // 求人票を表示する
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

        // 求人票が1つも無かったらその旨を通知する

    }, []);



    // ------求人票を修正する(始)------
    const [editDialogOpen, setEditDialogOpen] = useState(false); //編集ダイアログの表示フラグ
    const [editJoblist, setEditJoblist] = useState<Joblist | null>(null); //編集する求人票をeditJoblistとする

    const handleEdit = async (joblist: Joblist) => {
        setEditJoblist(joblist);
        setEditDialogOpen(true);
        // 修正用の入力フォームを表示する
        
        // 上書きしてよいか確認する

        
    }
    // DB上の求人票を新しい内容で上書きするAPIの呼び出し 未完成
    const handleEditJoblist = async (editedJoblist: Joblist) => {
        try {
            const response = await fetch(`/api/joblist`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({joblisting_id:editedJoblist.job_listing_id,application_format:editedJoblist.application_format, submission_date:editedJoblist.submission_date, visit_date:editedJoblist.visit_date, career_path_id:editedJoblist.career_path_id, notes:editedJoblist.notes, start_date:editedJoblist.start_date, end_date:editedJoblist.end_date}),
            });

            if (response.ok) {
                window.location.reload();
            } else {
                console.error("求人票の修正中にエラーが発生しました。HTTPステータスコード : ", response.status);
                // console.log('レスポンスのテキスト:', await response.text());
            }
        } catch (error) {
            console.error("求人票の修正中にエラーが発生しました。HTTPステータスコード : ", error);
        }
    }
    // ------求人票を修正する(終)------

    // 求人票を削除する
    const handleDelete = async (id: number) => {
        // 削除してよいか確認する

        // 求人票をDBから削除する
        try {
            const response = await fetch(`/api/joblist`, {
                method: 'DELETE',
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                body: JSON.stringify({job_listing_id: id})
            });
            
            if (response.ok) {
                window.location.reload();
            } else {
                console.error("求人票の削除中にエラーが発生しました。HTTPステータスコード : ", response.status);
            }
        } catch (error) {
            console.error("求人票の削除中にエラーが発生しました。HTTPステータスコード : ", error);
        }
      };




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

                        {/* Edit and delete buttons */}
                        {options.showEditDeleteButtons && (
                            <ListItem sx={{ pl: 4 }}>
                                <Button 
                                    variant='contained'
                                    color='primary'
                                    onClick={() => handleEdit(joblist)}
                                    startIcon={<EditIcon />}
                                >
                                    編集
                                </Button>
                                <Button 
                                    variant='contained'
                                    color='error'
                                    onClick={() => handleDelete(joblist.job_listing_id)}
                                    startIcon={<DeleteIcon />}
                                >
                                    削除
                                </Button>
                            </ListItem>
                        )}

                    </Collapse>
                </List>
            ))}
            {/* 編集のダイアログを表示するコンポーネントの呼び出し */}
            {/* <EditJoblistDialog
                open={editDialogOpen}
                joblist={editJoblist}
                onClose={() => setEditDialogOpen(false)}
                onEdit={(editedJoblist: Joblist) => handleEditJoblist(editedJoblist)}
            /> */}
        </div>
    );
}




// お知らせが無かった時のやつ