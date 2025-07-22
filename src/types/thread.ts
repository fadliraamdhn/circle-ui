export type Thread = {
    id: number;
    content: string;
    image?: string;
    createdByUser: {
        full_name: string;
        username: string;
    }
}

export type ThreadCardProps = {
    id: number;
    content: string;
    fullname: string;
    username: string;
    image?: string;
}
