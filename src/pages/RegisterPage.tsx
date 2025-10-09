import { Input } from "@/components/ui/input"
import { axiosInstance } from "@/utils/axios"
import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

export const RegisterPage = () => {
    const [form, setForm] = useState({
        username: "",
        fullName: "",
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await axiosInstance.post("/api/v1/auth/register", form)
            const message = res.data.message

            setForm({ username: "", fullName: "", email: "", password: "" });
            toast.success(message)
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || "Register Gagal." 
            toast.error(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center flex-col">
            <div className="w-full max-w-md">
                <h1 className="text-green-500 font-bold text-5xl">circle</h1>
                <h2 className="font-semibold text-2xl mt-3">Create Account Circle</h2>
                <div>
                    <form className="flex flex-col gap-3 mt-3" onSubmit={handleSubmit}>
                        <Input
                            name="username"
                            type="text"
                            className="p-5"
                            placeholder="Username"
                            value={form.username}
                            onChange={handleChange}
                        />
                        <Input
                            name="fullName"
                            type="text"
                            className="p-5"
                            placeholder="Full Name"
                            value={form.fullName}
                            onChange={handleChange}
                        />
                        <Input
                            name="email"
                            type="text"
                            className="p-5"
                            placeholder="Email"
                            value={form.email}
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
                            disabled={loading}
                            type="submit"
                            className={`cursor-pointer mt-3 font-semibold text-2xl bg-green-600 rounded-full py-1 hover:scale-103 transition 
                            ${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:-translate-y-1" }`}
                        >
                             {loading ? "Creating..." : "Create"}
                        </button>
                    </form>
                </div>
                <p className="mt-3 font-medium">Already have an account? <Link to="/login" className="text-green-500 ml-1 hover:text-green-200">Login</Link></p>
            </div>
        </main>
    )
}

export default RegisterPage