import { action_table, career_path_table } from "@prisma/client";

export type FormDialogProps = {
  initialData: {
    student_id?: string | undefined | string[];
    career_action_id?: number;
    selection_action?: string;
    notes?: string | null;
    company_name?: string;
    action_date?: Date;
    action_id?: number;
    career_path_id?: number;
    user_type?: string;
  };
  action_data: action_table[];
  career_path_data: career_path_table[];
};

export type ProfileProps = {
  Data: {
    student_id?: string | undefined | string[];
  };
};

export type CareerNameDialogProps = {
  initialData: {
    career_action_id?: number;
    notes?: string | null;
  };
};

export type PageChangeProps = {
  router_path_name?: string;
  button_message?: string;
};

export type ConfirmDialogProps = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
};
