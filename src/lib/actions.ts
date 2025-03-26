"use server";

import { permanentRedirect } from "next/navigation";
import { PostsResponse } from "./types";
import { delayMs } from "./utils";

export async function getPosts(limit: number, skip: number, query?: string) {
    const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}${query ? "&q=" + query : ""}&delay=${delayMs}`);
    const json = await response.json();
    return (json as PostsResponse).posts;
}

export async function getPostsResponse(limit: number, skip: number, query?: string) {
    const response = await fetch(`https://dummyjson.com/posts/search?limit=${limit}&skip=${skip}${query ? "&q=" + query : ""}&delay=${delayMs}`);
    const json = await response.json();
    return (json as PostsResponse);
}

export async function redirectToSearch(query: string) {
    return permanentRedirect(`/search?query=${query}`);
}