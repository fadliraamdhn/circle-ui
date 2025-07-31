import HomeLayout from "@/components/layout/HomeLayout";
import FollowersList from "@/components/Followers";
import FollowingList from "@/components/Followings";
import FollowTab from "@/components/ui/FollowTab";
import { useState } from "react";

const FollowPage = () => {
    const [activeTab, setActiveTab] = useState<"followers" | "following">("followers");

    return (
        <HomeLayout>
            <FollowTab active={activeTab} onChange={setActiveTab} />
            {activeTab === "followers" ? (
                <FollowingList/>
            ) : (
                <FollowersList/>
            )}
        </HomeLayout>
    )
}

export default FollowPage