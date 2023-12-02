import {useState, forwardRef,useEffect} from "react";
import {Input,InputLabel, FormControl,Button,styled,Stack,Paper,Collapse} from '@mui/material';
import { IMaskInput } from 'react-imask';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
    // console.log(data);
    return data.json();
}

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}
const TextMaskCustom = forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
        <IMaskInput
            {...other}
            mask="############"
            definitions={{
            '#': /[0-9]/,
            }}
            inputRef={ref}
            onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
        );
    },
);

export const EditContact = ({student_id}:any) => {
    const [contact_data, setContactData] = useState({
        personal_address: "",
        personal_phone: "",
        emergency_address: "",
        emergency_phone: "",
    });
    const [editing, setEditing] = useState(false)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContactData({
            ...contact_data,
            [event.target.name]: event.target.value,
        });
        // console.log(event.target.name,event.target.value);
    };

    const handleSaveSubmit = async(e:any) => {
        e.preventDefault(); //ページのリロードをしない
        await editContact(
            student_id,
            contact_data.personal_address,
            contact_data.personal_phone,
            contact_data.emergency_address,
            contact_data.emergency_phone
        );
        setEditing(false);
    }
    const handleCancelSubmit = async(e:any) => {
        getContactId();
        setEditing(false);
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
                setContactData({
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
    
    return (
        <div>
            <Stack spacing={3} direction = "column" justifyContent="center" alignItems="center">
                <Button onClick={() => {setEditing(true);}} type="submit" variant="contained" size="large">編集</Button>
                <FormControl variant="standard">
                    <InputLabel htmlFor="personal_phone">本人-携帯電話番号</InputLabel>
                    <Input
                    value={contact_data.personal_phone}
                    onChange={handleChange}
                    name="personal_phone"
                    inputComponent={TextMaskCustom as any}
                    disabled={!editing}
                    />
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel htmlFor="personal_address">現住所</InputLabel>
                    <Input
                    id= "personal_address"
                    value={contact_data.personal_address}
                    onChange={handleChange}
                    name="personal_address"
                    disabled={!editing}
                    // inputComponent={TextMaskCustom as any}
                    />
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel htmlFor="emergency_phone">緊急-電話番号</InputLabel>
                    <Input
                    id= "emergency_phone"
                    value={contact_data.emergency_phone}
                    onChange={handleChange}
                    name="emergency_phone"
                    inputComponent={TextMaskCustom as any}
                    disabled={!editing}
                    />
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel htmlFor="emergency_address">帰省先住所</InputLabel>
                    <Input
                    id= "emergency_address"
                    value={contact_data.emergency_address}
                    onChange={handleChange}
                    name="emergency_address"
                    disabled={!editing}
                    // inputComponent={TextMaskCustom as any}
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
