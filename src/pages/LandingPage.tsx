export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-4">Welcome to Circle</h1>
      <p className="text-lg opacity-80 mb-8 text-center max-w-md">
        Connect, collaborate, and create — a space for developers to share ideas
        and build something amazing together.
      </p>
      <div className="flex gap-4">
        <a
          href="/login"
          className="px-6 py-3 bg-green-500 rounded-full hover:bg-green-600 transition font-bold"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
