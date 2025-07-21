import type { ReactNode } from "react"
import { Home, UserSearch, Heart, User, LogOut } from "lucide-react"
import ProfileCard from "../ui/ProfileCard"
import "./homelayout.css"

const HomeLayout = ({ children }: { children: ReactNode}) => {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar kiri */}
            <aside className="w-70 border-r border-gray-600 py-6 px-5 flex flex-col justify-between">
                <div>
                    <div className="text-green-500 font-bold text-5xl mb-8">
                        Circle
                    </div>
                    <nav className="flex flex-col gap-3 mt-4 font-medium">
                        <div className="flex gap-4 p-2 hover:bg-gray-600 rounded cursor-pointer">
                            <Home/>
                            <a href="">Home</a>
                        </div>
                        <div className="flex gap-4 p-2 hover:bg-gray-600 rounded cursor-pointer">
                            <UserSearch/>
                            <a href="">Search</a>
                        </div>
                        <div className="flex gap-4 p-2 hover:bg-gray-600 rounded cursor-pointer">
                            <Heart/>
                            <a href="">Follows</a>
                        </div>
                        <div className="flex gap-4 p-2 hover:bg-gray-600 rounded cursor-pointer">
                            <User/>
                            <a href="">Profile</a>
                        </div>
                        <button className="bg-green-600 cursor-pointer rounded-full px-6 py-2 font-medium">Create Post</button>
                    </nav>
                </div>
                <div className="flex gap-4 p-2 hover:bg-gray-600 rounded cursor-pointer">
                    <LogOut className="rotate-180"/>
                    <p className="font-medium">Logout</p>
                </div>
            </aside>

            {/* Konten utama */}
            <main className="flex-1 pt-9 overflow-y-auto custom-scroll h-screen">
                {children}
            </main>

            <aside className="w-100 px-4 pt-10 hidden md:block">
                <h2 className="font-semibold mb-4">My Profile</h2>
                <ProfileCard/>
            </aside>
        </div>
    )
}

export default HomeLayout