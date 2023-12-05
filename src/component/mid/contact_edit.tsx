import React, {useState, forwardRef,useEffect} from "react";
import {FormControl,Button,Stack,Collapse,TextField} from '@mui/material';

const editContact = async(
    student_id: string,
    personal_address: string,
    personal_phone: string,
    emergency_address: string,
    emergency_phone: string,
) => {
    const data = await fetch("/api/profile",{
        method:'PUT',
        body: JSON.stringify({student_id, personal_address,personal_phone,emergency_address,emergency_phone}),
    });
    return data.json();
}

export const EditContact = ({student_id}:any) => {
    const [editing, setEditing] = useState(false)
    const [formData, setFormData] = useState({
        personal_address: "",
        personal_phone: "",
        emergency_address: "",
        emergency_phone: "",
    });
    const [formError, setFormError] = useState({
        personal_address: false,
        personal_phone: false,
        emergency_address: false,
        emergency_phone: false,
    });

    // formErrorの全てのプロパティをfalseに設定する関数
    const resetFormError = () => {
        setFormError({
            personal_address: false,
            personal_phone: false,
            emergency_address: false,
            emergency_phone: false,
        });
    };
    
    // DBに保存する関数を実行する関数
    const handleSaveSubmit = async(event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); //ページのリロードをしない
        if (formError.personal_phone || formError.personal_address || formError.emergency_address || formError.emergency_phone) {
            // 要件を満たさない場合、保存を行わずに関数を終了する
            return;
        }
        await editContact(
            student_id,
            formData.personal_address,
            formData.personal_phone,
            formData.emergency_address,
            formData.emergency_phone
        );
        setEditing(false);
    }

    // 変更をキャンセルする場合
    const handleCancelSubmit = async() => {
        getContactId();
        setEditing(false);
        resetFormError();
    }

    const getContactId = async() => {
        try{
            const response = await fetch(`/api/profile?student_id=${student_id}` ,{
                method:'GET',
            });
            // console.log(response);
            if(response.ok){
                const data = await response.json();
                const { personal_address, personal_phone, emergency_address, emergency_phone } = data;
                setFormData({
                    personal_address: personal_address || "",
                    personal_phone: personal_phone || "",
                    emergency_address: emergency_address || "",
                    emergency_phone: emergency_phone || "",
                });
            }
        }catch (error){
            console.error("Error:Not Found User!")
        }
    } 
    useEffect(() => {
        getContactId();
    },[]);

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        // 携帯電話番号の入力が数字以外の文字を含むかどうか　数字以外ならErrorをtrue
        const regex = new RegExp("^[0-9]+$");
        const isValidError = !regex.test(value)

        setFormData({
          ...formData,
          [name]: value,
        });
        // 携帯電話番号が要件を満たしていない場合、エラーをセット
        setFormError(({
            ...formError,
            [name]: isValidError
        }));
      };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        // 住所の入力が文字を含むかどうか　空白ならErrorをtrue
        const isValidError = value.trim() === ""
        setFormData({
        ...formData,
        [name]: value,
        });
        // 携帯電話番号が要件を満たしていない場合、エラーをセット
        setFormError(({
            ...formError,
            [name]: isValidError
        }));
    };

    return (
        <div>
            <Stack spacing={3} direction = "column" justifyContent="center" alignItems="center">
                <Button onClick={() => {setEditing(true);}} type="submit" variant="contained" size="large">編集</Button>
                <FormControl variant="standard">
                    <TextField
                        required
                        margin="dense"
                        id="personal_phone"
                        name="personal_phone"
                        label="本人-携帯電話番号"
                        inputProps={{ maxLength: 13}}
                        value={formData.personal_phone}
                        onChange={handlePhoneChange}
                        error={formError.personal_phone}
                        helperText={formError.personal_phone ? "半角数字のみ入力してください":""}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="emergency_phone"
                        name="emergency_phone"
                        label="緊急-携帯電話番号"
                        inputProps={{ maxLength: 13}}
                        value={formData.emergency_phone}
                        onChange={handlePhoneChange}
                        error={formError.emergency_phone}
                        helperText={formError.emergency_phone ? "半角数字のみ入力してください":""}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="personal_address"
                        name="personal_address"
                        label="現住所"
                        value={formData.personal_address}
                        onChange={handleInputChange}
                        error={formError.personal_address}
                        helperText={formError.personal_address ? "住所を入力してください":""}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="emergency_address"
                        name="emergency_address"
                        label="帰省先住所"
                        value={formData.emergency_address}
                        onChange={handleInputChange}
                        error={formError.emergency_address}
                        helperText={formError.emergency_address ? "住所を入力してください":""}
                    />
                </FormControl>
                <Collapse in={editing}>
                    <Stack direction="row" spacing={2}>
                        <Button onClick={handleSaveSubmit} type="submit" variant="contained">保存</Button>
                        <Button onClick={handleCancelSubmit} type="submit" variant="contained">取消</Button>
                    </Stack>
                </Collapse>
            </Stack>
        </div>
    )
}
