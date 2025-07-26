import HomeLayout from "@/components/layout/HomeLayout";
import RepliesCard from "@/components/ui/RepliesContent";
import RepliesList from "@/components/ui/RepliesList";
import { CreateReplyModal } from "@/components/CreateReplyModal";
import { useParams } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ThreadPage = () => {
    const { threadId } = useParams()

    return (
        <HomeLayout>
            <div>
                <Link to={`/`} className="cursor-pointer hover:text-green-700 transition flex items-center px-6 gap-4">
                    <MoveLeft/>
                    <h1 className="text-2xl font-medium">Status</h1>
                </Link>
            </div>
            <div className="flex gap-2 items-center border-b border-gray-600">
                <RepliesCard />
            </div>
            <div className="px-4 py-4 border-b border-gray-600">
                <CreateReplyModal threadId={Number(threadId)}/>
            </div>
            <div>
                <RepliesList/>
            </div>
        </HomeLayout>
    )
}

export default ThreadPage