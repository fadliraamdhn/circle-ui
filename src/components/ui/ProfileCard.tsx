const ProfileCard = () => {
  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden text-white max-w-md mx-auto">
        <div className="bg-gradient-to-r from-green-300 via-yellow-300 to-green-400 h-24 w-full" />

        <div className="p-4 relative">
            <div className="absolute -top-10 left-4">
            <img
                src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid&w=740"
                alt="profile"
                className="w-20 h-20 rounded-full border-4 border-zinc-900"
            />
            </div>

            <div className="text-right">
            <button className="border border-gray-500 rounded-full px-4 py-1 text-sm hover:bg-white hover:text-black transition">
                Edit Profile
            </button>
            </div>

            <div className="mt-4">
            <h2 className="font-bold text-xl">Fadli Ramadhan</h2>
            <p className="text-gray-400">@Fadli</p>
            <p className="mt-2 text-sm">
                itami o kanjiro itami o kangaero itami o uketore itami O shire koko yori... sekai ni itami O... Sinra Tensei.
            </p>

            <div className="flex gap-4 mt-3 text-sm text-gray-400">
                <span><strong className="text-white">10</strong> Following</span>
                <span><strong className="text-white">5</strong> Followers</span>
            </div>
            </div>
        </div>
    </div>
  );
};

export default ProfileCard;
