import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { useState } from "react"
import { axiosInstance } from "@/utils.ts/axios"
import { toast } from "sonner"
import { useProfile } from "@/hooks/useProfile"

const LoginPage = () => {
    const { setProfile } = useProfile()
    const [form, setForm] = useState({identity: "", password: ""})
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        

        try {
            const res = await axiosInstance.post("api/v1/auth/login", form)
            const userData = res.data.data

            setProfile(userData);
            localStorage.setItem('isLoggedIn', 'true');
            setForm({ identity: "", password: ""});
            toast.success(`Selamat datang kembali, ${userData.username}!`)
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || "Login gagal." 
            toast.error(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center flex-col">
            <div className="w-full max-w-md">
                <h1 className="text-green-500 font-bold text-5xl">circle</h1>
                <h2 className="font-semibold text-2xl mt-3">Login to Circle</h2>

                <div>
                    <form className="flex flex-col gap-3 mt-3" onSubmit={handleSubmit}>
                        <Input
                            name="identity"
                            type="text"
                            className="p-5"
                            placeholder="Username / Email"
                            value={form.identity}
                            onChange={handleChange}
                        />
                        <Input
                            name="password"
                            type="password"
                            className="p-5"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            className={`cursor-pointer mt-3 font-semibold text-2xl bg-green-600 rounded-full py-1 hover:scale-103 transition ${
                            loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:-translate-y-1"
                            }`}
                        >
                            Login
                        </button>
                    </form>
                </div>
                <p className="mt-3 font-medium">Dont have an account yet? <Link to="/register" className="text-green-500 ml-1 hover:text-green-200">Create accounts</Link></p>
            </div>
        </main>
    )
}

export default LoginPage