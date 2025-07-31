import HomeLayout from "@/components/layout/HomeLayout"
import SearchUsersWithFollow from "@/components/SearchUser"

const SearchPage = () => {
    return (
        <HomeLayout>
            <h1 className="text-2xl font-medium px-6">Search Someone</h1>
            <SearchUsersWithFollow/>
        </HomeLayout>
    )
}

export default SearchPage