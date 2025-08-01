import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { axiosInstance } from "@/utils/axios";
import type { RootState } from "@/store";
import { setProfile } from "@/store/profileSlice";
import { toast } from "sonner";
import { baseUrl } from "@/utils/apiProd";

const UpdateProfileForm = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state: RootState) => state.profile.profile);

    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Saat komponen mount / profile berubah
    useEffect(() => {
        if (profile) {
            setFullname(profile.fullname || "");
            setUsername(profile.username || "");
            setBio(profile.bio || "");
            if (profile.photoProfile) {
                setPreviewUrl(`${baseUrl}/uploads/${profile.photoProfile}`);
            }
        }
        
    }, [profile]);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
            if (file) {
            setPhotoFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("full_name", fullname);
            formData.append("username", username);
            formData.append("bio", bio);
            if (photoFile) {
                formData.append("photo", photoFile);
            }
            const res = await axiosInstance.patch("/api/v1/profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(res);
            
            dispatch(setProfile(res.data.data));
            toast.success(`Update berhasil, ${username}!`)
        } catch (err) {
            console.error("Update failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full px-6 mt-6">
            <div className="flex flex-col justify-center gap-4">
                {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-24 h-24 rounded-full mx-auto object-cover mx-auto" />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto" />
                )}
                <label className="cursor-pointer bg-green-600 text-white text-center rounded py-2 w-24 mx-auto">
                    Upload
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                    />
                </label>
            </div>
            <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="w-full border px-3 py-2 rounded-lg"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border px-3 py-2 rounded-lg"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Bio</label>
                <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full border px-3 py-2 rounded-lg"
                />
            </div>

            <button
                type="submit"
                className="bg-green-600 rounded-full font-medium w-full text-white cursor-pointer px-4 py-2 rounded"
                disabled={loading}
            >
                {loading ? "Updating..." : "Update Profile"}
            </button>
        </form>
    );
};

export default UpdateProfileForm;
