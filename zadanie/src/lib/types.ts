export type Tag = {
    slug: string;
    name: string;
}

export type Article = {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
        likes: number;
        dislikes: number;
    };
    views: number;
    userId: number;
}

export type PostsResponse = {
    limit: number;
    posts: Article[];
    skip: number;
    total: number;
}