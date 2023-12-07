import { Button } from "@mui/material";
import { PageChangeProps } from "@/types/props";

export default function PageChangeButton(props:PageChangeProps) {
    return (
        <Button 
        href={props.router_path_name} 
        color="primary" 
        variant="contained"
        >
        ログインページに移動
        </Button>
    );
  }