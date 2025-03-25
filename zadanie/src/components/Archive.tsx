"use client";

import { Article, PostsResponse } from '@/app/page'
import { getPosts, getPostsResponse } from '@/utils/actions';
import { getSlug } from '@/utils/functions';
import { Button, Card, Grid2, Pagination, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export interface ArchiveProps {
    posts: Article[],
    loadMore: {
        limit: number,
        startFrom: number,
    },
    postsProps: PostsResponse
}

//TODO load new posts on page change, or if page is refreshed calculate how many posts should be loaded
// export default function Archive(props: ArchiveProps) {

//     const router = useRouter();

//     const postsPerPage = 3;
//     const page = parseInt(useSearchParams().get('page') || '1');

//     const [postsData, setPostsData] = useState<PostsResponse>();
//     const [loading, setLoading] = useState(true);

//     console.log("postsData", postsData);

//     useEffect(() => {
//         const fetchPostsProps = async () => {
//             setLoading(true);
//             const postsData = await getPostsResponse(postsPerPage * page, 0);
//             setPostsData(postsData);
//             setLoading(false);
//         }
//         fetchPostsProps()
//     }, [page]);


//     const handleLoadMore = async () => {
//         const nextPage = page + 1;
//         history.pushState({}, '', `?page=${nextPage}`);
//         // router.push(`?page=${nextPage}`);
//         // posts will auto-update due to useEffect
//     };

//     return (
//         <Grid2 container columns={3} columnSpacing={7} rowSpacing={6}>
//             {
//                 postsData?.posts.map(post => (
//                     <Grid2 size={1} key={post.id}>
//                         <Card component={Link} href={`/post/${getSlug(post.id, post.title)}`} sx={{ cursor: "pointer", textDecoration: "none" }}>
//                             <Typography variant={"h3"}>{post.id} {post.title}</Typography>
//                             <Typography variant={"body1"} color='textSecondary'>{post.body.slice(0, 100)}...</Typography>
//                             <Typography variant={"body2"}>Tags: {post.tags.join(', ')}</Typography>
//                             <Typography variant={"body2"}>Likes: {post.reactions.likes}</Typography>
//                             <Typography variant={"body2"}>Dislikes: {post.reactions.dislikes}</Typography>
//                             <Typography variant={"body2"}>Views: {post.views}</Typography>
//                             <Typography variant={"body2"}>User ID: {post.userId}</Typography>
//                         </Card>
//                     </Grid2>
//                 ))
//             }
//             {
//                 postsData && postsData.total - 220 > postsPerPage * page &&

//                 <Button
//                     variant='contained'
//                     onClick={handleLoadMore}
//                     // disabled={loadingBtn}
//                     // loading={loadingBtn}
//                     loadingPosition='end'>Load more</Button>
//             }
//         </Grid2>
//     )
// }

export default function Archive(props: ArchiveProps) {


    const [posts, setPosts] = useState(props.postsProps.posts);

    const [loading, setLoading] = useState(false);

    const loadMorePosts = async () => {
        setLoading(true);
        const newPosts = await getPosts(props.loadMore.limit, posts.length);
        // const response = await fetch(`https://dummyjson.com/posts?limit=${props.loadMore.limit}&skip=${posts.length}`);
        // const json = await response.json() as PostsResponse;
        // console.log("new posts", json.posts, "response", json);
        // setPosts([...posts, ...json.posts]);
        setPosts([...posts, ...newPosts]);
        setLoading(false);
    }

    return (
        <Grid2 container columns={3} columnSpacing={7} rowSpacing={6}>
            {
                posts.map(post => (
                    <Grid2 size={1} key={post.id}>
                        <Card component={Link} href={`/post/${getSlug(post.id, post.title)}`} sx={{ cursor: "pointer", textDecoration: "none" }}>
                            <Typography variant={"h3"}>{post.id} {post.title}</Typography>
                            <Typography variant={"body1"} color='textSecondary'>{post.body.slice(0, 100)}...</Typography>
                            <Typography variant={"body2"}>Tags: {post.tags.join(', ')}</Typography>
                            <Typography variant={"body2"}>Likes: {post.reactions.likes}</Typography>
                            <Typography variant={"body2"}>Dislikes: {post.reactions.dislikes}</Typography>
                            <Typography variant={"body2"}>Views: {post.views}</Typography>
                            <Typography variant={"body2"}>User ID: {post.userId}</Typography>
                        </Card>
                    </Grid2>
                ))
            }

            <Button variant='contained' onClick={loadMorePosts} disabled={loading} loading={loading} loadingPosition='end'>Load more</Button>
        </Grid2>
    )

    // return (
    //     <Grid2 container columns={3} columnSpacing={7} rowSpacing={6}>
    //         {
    //             posts.map(post => (
    //                 <Grid2 size={1} key={post.id}>
    //                     <Card component={Link} href={`/post/${getSlug(post.id, post.title)}`} sx={{ cursor: "pointer", textDecoration: "none" }}>
    //                         <Typography variant={"h3"}>{post.id} {post.title}</Typography>
    //                         <Typography variant={"body1"} color='textSecondary'>{post.body.slice(0, 100)}...</Typography>
    //                         <Typography variant={"body2"}>Tags: {post.tags.join(', ')}</Typography>
    //                         <Typography variant={"body2"}>Likes: {post.reactions.likes}</Typography>
    //                         <Typography variant={"body2"}>Dislikes: {post.reactions.dislikes}</Typography>
    //                         <Typography variant={"body2"}>Views: {post.views}</Typography>
    //                         <Typography variant={"body2"}>User ID: {post.userId}</Typography>
    //                     </Card>
    //                 </Grid2>
    //             ))
    //         }

    //         <Button variant='contained' onClick={loadMorePosts} disabled={loadingBtn} loading={loadingBtn} loadingPosition='end'>Load more</Button>
    //     </Grid2>
    // )
}






