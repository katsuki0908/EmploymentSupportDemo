// 求人票編集ページ
import Header from "@/component/big/header";
import Joblists from "@/component/big/joblist";
import JoblistAddFormDialog from "@/component/big/joblist_add_form";
import { useSession } from "next-auth/react";
import GoToLogInPageDialog from "@/component/Molecules/go_to_login_page_dialog";

export default function EditJoblistPage() {
    const { data: session } = useSession();

    if (session?.user.user_type !== 'admin') {
        return (
            <GoToLogInPageDialog />
        );
    }
    // 追加、編集、削除ボタンの動作
    return (
        <div>
            <Header />
            {/* 追加、編集、削除ボタン */}
            <JoblistAddFormDialog />
            <Joblists showCheckbox={false} showEditDeleteButtons={true} />
        </div>
    );
}