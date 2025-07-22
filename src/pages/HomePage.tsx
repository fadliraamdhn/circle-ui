import HomeLayout from "@/components/layout/HomeLayout";
import ThreadList from "@/components/ui/ThreadList";
import { CreateThreadModal } from "@/components/CreateThreadModal";

const HomePage = () => {
    return (
        <HomeLayout>
            <h1 className="text-2xl font-medium px-6">Home</h1>
            <div className="flex gap-2 items-center mt-6 px-6">
                <img 
                    src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid&w=740" 
                    className="rounded-full border w-11 h-11"
                />
                <CreateThreadModal />
            </div>
            <ThreadList/>
        </HomeLayout>
    )
}

export default HomePage