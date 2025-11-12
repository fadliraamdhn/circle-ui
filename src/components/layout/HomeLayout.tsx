import type { ReactNode } from "react"
import "./homelayout.css"
import ProfileCard from "../ui/ProfileCard"
import SuggestedUsers from "../ui/SuggestedUser"
import MobileNav from "../MobileNav"
import { Link, useNavigate } from "react-router-dom"
import { Home, UserSearch, Heart, User, LogOut} from "lucide-react"
import { CreateButtonModal } from "../CreateButton"
import { axiosInstance } from "@/utils/axios"


const HomeLayout = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate()
    const handleLogout = async () => { 
        await axiosInstance.post("/api/v1/auth/logout"); 
        localStorage.removeItem('isLoggedIn'); 
        navigate("/")
    }

    return (
        <div className="flex min-h-screen max-w-[1600px] mx-auto">
            <aside className="w-70 sticky top-0 h-screen border-r border-gray-600 px-5 py-6 hidden lg:flex flex-col justify-between">
                <div>
                    <div className="text-green-500 font-bold text-5xl mb-8">
                        Circle
                    </div>
                    <nav className="flex flex-col gap-3 mt-4 font-medium ">
                            <Link to="/home">
                                <div className="flex gap-4 p-2 hover:bg-gray-600 rounded cursor-pointer">
                                <Home />
                                Home
                                </div>
                            </Link>
                            <Link to="/search">
                                <div className="flex gap-4 p-2 hover:bg-gray-600 rounded cursor-pointer">
                                <UserSearch />
                                Search
                                </div>
                            </Link>
                            <Link to="/follow">
                                <div className="flex gap-4 p-2 hover:bg-gray-600 rounded cursor-pointer">
                                <Heart />
                                Follow
                                </div>
                            </Link>
                            <Link to="/me">
                                <div className="flex gap-4 p-2 hover:bg-gray-600 rounded cursor-pointer">
                                <User />
                                Profile
                                </div>
                            </Link>
                            <CreateButtonModal />
                        </nav>
                    </div>
                <div
                    className="flex gap-4 p-2 hover:bg-gray-600 rounded cursor-pointer mt-6"
                    onClick={() => handleLogout()}
                >
                    <LogOut className="rotate-180" />
                    <p className="font-medium">Logout</p>
                </div>
            </aside>

            <MobileNav />

            <main className="flex-1 py-8 px-4 mt-14 lg:mt-0">
                {children}
            </main>

            <aside className="w-100 sticky top-0 h-screen px-4 pt-10 hidden lg:block border-l border-gray-600">
                <ProfileCard />
                <SuggestedUsers />
            </aside>
        </div>
    )
}

export default HomeLayout