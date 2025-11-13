import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">

            {/* Background gradient + blur circles */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute w-[600px] h-[600px] bg-green-500 rounded-full blur-3xl opacity-30 -top-32 -left-32 animate-pulse-slow"></div>
                <div className="absolute w-[400px] h-[400px] bg-blue-500 rounded-full blur-2xl opacity-20 -bottom-32 -right-24 animate-pulse-slow"></div>
            </div>

            {/* Hero Section */}
            <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
                <h1 className="text-6xl md:text-7xl font-bold text-green-400 mb-6">Circle</h1>
                <p className="text-lg md:text-xl max-w-2xl text-gray-300 mb-10">
                Connect, collaborate, and create — a social platform for developers and creators
                to share ideas and build amazing projects together.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                <Link to={"/register"} className="px-8 py-3 bg-green-500 rounded-full font-bold hover:bg-green-600 transition">
                    Register Now
                </Link>
                <Link to={"/login"} className="px-8 py-3 bg-transparent border-2 border-green-500 rounded-full font-bold hover:bg-green-500 hover:text-black transition">
                    Login
                </Link>
                </div>
            </section>  
        </div>
  );
}
