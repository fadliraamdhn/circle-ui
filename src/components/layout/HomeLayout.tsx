import type { ReactNode } from "react"
import { Home, UserSearch, Heart, User, LogOut } from "lucide-react"
import ProfileCard from "../ui/ProfileCard"
import SuggestedUsers from "../ui/SuggestedUser"
import "./homelayout.css"
import { axiosInstance } from "@/utils/axios"
import { Link } from "react-router-dom"

const HomeLayout = ({ children }: { children: ReactNode}) => {

    const handleLogout = async () => {
        await axiosInstance.post("/api/v1/auth/logout");
        localStorage.removeItem('isLoggedIn');
        window.location.href = '/login';
    };

    return (
        <div className="flex min-h-screen max-w-[1600px] mx-auto">
            {/* Sidebar kiri */}
            <aside className="w-70 sticky top-0 h-screen border-r border-gray-600 py-6 px-5 flex flex-col justify-between">
                <div>
                    <div className="text-green-500 font-bold text-5xl mb-8">
                        Circle
                    </div>
                    <nav className="flex flex-col gap-3 mt-4 font-medium">
                        <Link to="/">
                            <div className="flex gap-4 p-2 hover:bg-gray-600 rounded cursor-pointer">
                                <Home/>
                                Home
                            </div>
                        </Link>
                        <Link to="/search">
                            <div className="flex gap-4 p-2 hover:bg-gray-600 rounded cursor-pointer">
                                <UserSearch/>
                                Search
                            </div>
                        </Link>
                        <Link to="/follow">
                            <div className="flex gap-4 p-2 hover:bg-gray-600 rounded cursor-pointer">
                                <Heart/>
                                Follow
                            </div>
                        </Link>
                        <Link to="/me">
                            <div className="flex gap-4 p-2 hover:bg-gray-600 rounded cursor-pointer">
                                <User/>
                                Profile
                            </div>
                        </Link>
                        <button className="bg-green-600 cursor-pointer rounded-full px-6 py-2 font-medium">Create Post</button>
                    </nav>
                </div>
                <div className="flex gap-4 p-2 hover:bg-gray-600 rounded cursor-pointer">
                    <LogOut className="rotate-180"/>
                    <p className="font-medium" onClick={() => handleLogout()}>Logout</p>
                </div>
            </aside>

            {/* Konten utama */}
            <main className="flex-1 py-8">
                {children}
            </main>

            <aside className="w-100 sticky top-0 h-screen px-4 pt-10 hidden md:block">
                <h2 className="font-semibold mb-4">My Profile</h2>
                <ProfileCard/>
                <SuggestedUsers/>
            </aside>
        </div>
    )
}

export default HomeLayout