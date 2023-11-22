import { action_table,career_path_table } from "@prisma/client";

export type FormDialogProps = {
    initialData: {
      student_id?: string | undefined,
      career_action_id?: number,
      selection_action?: string,
      notes?: string | null,
      company_name?: string,
      action_date?: Date,
    };
    action_data: action_table[];
    career_path_data: career_path_table[];
  };
  
  export type ProfileProps = {
    Data: {
    student_id?: string | undefined,
    };
  };
