export type Profile = {
    id: number,
    username: string,
    fullname: string,
    email: string,
    bio: string,
    photoProfile?: string | null
    followers: number[]
    following: number[]
}

export function mapToProfile(data: any): Profile {
    return {
        id: data.id,
        username: data.username,
        fullname: data.full_name,
        email: data.email,
        bio: data.bio,
        photoProfile: data.photo_profile,
        followers: data.followers.map((f: any) => f.followingId.id),
        following: data.following.map((f: any) => f.followerId.id),
    };
}


export type Follower = {
    id: number;
    username: string;
    full_name: string;
    photo_profile: string | null;
    bio: string;
    isFollowed: boolean;
    isFollowing: boolean;
};