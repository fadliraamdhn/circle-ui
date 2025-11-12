import HomeLayout from "@/components/layout/HomeLayout";
import ThreadList from "@/components/ui/ThreadList";
import { CreateThreadModal } from "@/components/CreateThreadModal";
import { useProfile } from "@/hooks/useProfile";
import { baseUrl } from "@/utils/apiProd";

const HomePage = () => {
    const profile = useProfile()
    return (
        <HomeLayout>
            <h1 className="text-2xl font-medium px-6">Home</h1>
            <div className="flex gap-2 items-center mt-3 px-3">
                <img 
                    src= {profile?.photoProfile? `${baseUrl}/uploads/${profile?.photoProfile}` : "default.jpg" }
                    className="rounded-full border w-11 h-11 object-cover"
                />
                <CreateThreadModal />
            </div>
            <ThreadList/>
        </HomeLayout>
    )
}

export default HomePage