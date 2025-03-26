import Archive from "@/components/Archive";
import { delayMs, postsPerPage } from "@/lib/utils";
import { PostsResponse } from "@/lib/types";

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string
    }>
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

    const res = await fetch(`https://dummyjson.com/posts/search?q=${query}&limit=${postsPerPage}&delay=${delayMs}`)
    const data = await res.json()
    const initPostsRes = data as PostsResponse;


    return (
        <Archive
            title={`Search results for: ${query}`}
            initialPosts={initPostsRes}
            loadMorePosts={async (skip: number) => {
                "use server";
                const response = await fetch(`https://dummyjson.com/posts/search?q=${query}&limit=${postsPerPage}&skip=${skip}&delay=${delayMs}`);
                const json = await response.json();
                return (json as PostsResponse).posts;
            }}
        />
    )
}
