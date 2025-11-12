import { Home, UserSearch, Heart, User, LogOut } from "lucide-react"
import { Link } from "react-router-dom"
import { axiosInstance } from "@/utils/axios"

const MobileNav = () => {
    const handleLogout = async () => {
        await axiosInstance.post("/api/v1/auth/logout");
        localStorage.removeItem("isLoggedIn");
        window.location.href = "/login";
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-700 bg-black lg:hidden">
            <nav className="flex justify-between items-center px-4 py-3">
                <div className="text-green-500 font-bold text-xl">Circle</div>
                    <div className="flex items-center gap-5">
                    <Link to="/home">
                        <Home className="w-6 h-6" />
                    </Link>
                    <Link to="/search">
                        <UserSearch className="w-6 h-6" />
                    </Link>
                    <Link to="/follow">
                        <Heart className="w-6 h-6" />
                    </Link>
                    <Link to="/me">
                        <User className="w-6 h-6" />
                    </Link>
                    <button onClick={handleLogout}>
                        <LogOut className="w-6 h-6 rotate-180" />
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default MobileNav
