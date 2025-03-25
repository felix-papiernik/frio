import { Box, Typography } from "@mui/material";
import Arch from "@/components/Arch";
import { postsPerPage } from "@/utils/functions";
import { PostsResponse } from "../page";

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string,
        page?: number
    }>
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const page = searchParams?.page || 1;
    console.log("query", query);

    const res = await fetch(`https://dummyjson.com/posts/search?q=${query}&limit=${page * postsPerPage}&skip=0&delay=1000`)
    const data = await res.json()
    const initPostsRes = data as PostsResponse;

    console.log("init searchPostsRes", initPostsRes);

    return (
        <Box maxWidth={"lg"} margin={"auto"} padding={2}>
            <Typography variant={"h1"} sx={{ mb: 2 }}>Search results for: {query}</Typography>
            <Typography variant={"body1"} sx={{ mb: 2 }}>Total: {initPostsRes.total}</Typography>
            <Arch
                initialPosts={initPostsRes}
                postsPerPage={postsPerPage}
                loadMorePosts={async (skip: number) => {
                    "use server";
                    const response = await fetch(`https://dummyjson.com/posts/search?q=${query}&limit=${postsPerPage}&skip=${skip}&delay=1000`);
                    const json = await response.json();
                    return (json as PostsResponse).posts;
                }}
            />
        </Box>
    )
}
