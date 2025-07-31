export type Thread = {
    id: number;
    content: string;
    image?: string | null;
    number_of_replies: number;
    created_by: number;
    created_at: string;
    updated_at?: string | null;
    updated_by?: number | null;
    number_of_likes: number;
    createdByUser: {
        id: number;
        full_name: string;
        username: string;
        photo_profile?: string | null;
    };
};

export type ThreadCardProps = {
    id: number;
    content: string;
    photoProfile?: string| null
    fullname: string;
    username: string;
    image?: string;
    numberReplies: number;
    numberLikes: number;
    createdAt: string
}

export type Reply = {
    id: number;
    user_id: number;
    thread_id: number;
    image?: string | null;
    content: string;
    created_at: string;
    created_by: number;
    updated_at?: string | null;
    updated_by?: number | null;
    user: {
        id: number;
        username: string;
        full_name: string;
        photo_profile: string
    };
};

