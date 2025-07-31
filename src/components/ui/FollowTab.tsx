type Tab = "followers" | "following";

interface Props {
    active: Tab;
    onChange: (tab: Tab) => void;
}

const FollowTab = ({ active, onChange }: Props) => {
    return (
        <div className="flex border-b border-gray-200 justify-center">
        {(["followers", "following"] as Tab[]).map((tab) => (
            <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`cursor-pointer w-full px-6 py-2 text-lg font-medium transition-all duration-200 ${
                active === tab
                ? "text-white border-b border-green-400 mb-1"
                : "text-gray-400 hover:text-white"
            }`}
            >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
        ))}
        </div>
    );
};

export default FollowTab;
