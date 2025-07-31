import HomeLayout from "@/components/layout/HomeLayout";
import UpdateProfileForm from "@/components/UpdateProfile";

const UpdateProfilePage = () => {
    return (
        <HomeLayout>
            <h1 className="text-2xl font-medium px-6">Update Your Profile</h1>
            <UpdateProfileForm/>
        </HomeLayout>
    )
}

export default UpdateProfilePage