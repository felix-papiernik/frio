"use server";

import { PostsResponse } from "@/app/page";

export async function getPosts(limit: number, skip: number, query?: string) {
    const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}${query ? "&q=" + query : ""}&delay=1000`);
    const json = await response.json();
    return (json as PostsResponse).posts;
}

export async function getPostsResponse(limit: number, skip: number, query?: string) {
    const response = await fetch(`https://dummyjson.com/posts/search?limit=${limit}&skip=${skip}${query ? "&q=" + query : ""}&delay=1000`);
    const json = await response.json();
    return (json as PostsResponse);
}