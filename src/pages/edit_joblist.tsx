// 求人票編集ページ

import Header from "@/component/big/header";
import Joblists from "@/component/big/joblist";

export default function EditJoblistPage() {

    // 追加、編集、削除ボタンの動作

    return (
        <div>
            <Header />

            {/* 追加、編集、削除ボタン */}

            <Joblists showCheckbox={true} />
        </div>
    );
}