export type Profile = {
    id: number,
    username: string,
    fullname: string,
    email: string,
    bio: string,
    photoProfile: string
    follower: number
    following: number
}

export function mapToProfile(data: any): Profile {
    return {
        id: data.id,
        username: data.username,
        fullname: data.full_name,
        email: data.email,
        bio: data.bio,
        photoProfile: data.photo_profile,
        follower: data.followers,
        following: data.following
    };
}