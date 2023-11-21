// 求人票閲覧ページ

import Header from "@/component/big/header";
import Joblists from "@/component/big/joblist";

export default function EditJoblistPage() {

    return (
        <div>
            <Header />
            <Joblists showCheckbox={false} />
        </div>
    );
}