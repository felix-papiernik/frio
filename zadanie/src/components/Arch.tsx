"use client";

import { Article, PostsResponse } from '@/app/page'
import { getPosts, getPostsResponse } from '@/utils/actions';
import { getSlug } from '@/utils/functions'
import { Search } from '@mui/icons-material';
import { Grid2, Card, Typography, Button, TextField, Stack, Box, OutlinedInput, FormControl, InputLabel, CircularProgress, IconButton } from '@mui/material'
import Link from 'next/link'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export interface ArchiveProps {
    initialPosts: PostsResponse,
    postsPerPage: number,
    loadMorePosts: (skip: number) => Promise<Article[]>
}

export default function Arch({ initialPosts, postsPerPage, loadMorePosts }: ArchiveProps) {

    const [data, setData] = useState(initialPosts);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    async function handleLoadMore() {
        setLoading(true);
        const addPosts = await loadMorePosts(data.posts.length);
        setData(prev => ({ ...prev, posts: [...prev.posts, ...addPosts] }));
        setPage(page + 1);//todo check
        setLoading(false);
    }

    useEffect(() => {
        setData(initialPosts);
    }, [initialPosts]);

    return (
        <Stack direction={"column"} spacing={2} justifyContent={"center"} alignItems={"center"}>
            <Box maxWidth="lg" width="100%">
                <Grid2 container columns={3} columnSpacing={4} rowSpacing={6}>
                    {
                        data.posts.map(post => (
                            <Grid2 size={1} key={post.id}>
                                <Card sx={{ cursor: "pointer", textDecoration: "none", p: 2 }}>
                                    <Typography variant={"h5"} component={Link} href={`/post/${getSlug(post.id, post.title)}`}>{post.id} {post.title}</Typography>
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
                </Grid2>
            </Box>
            <LoadMoreButton
                handleClick={handleLoadMore}
                disabled={loading || data.total === data.posts.length}
                loading={loading}
                setLoading={setLoading}
            />
        </Stack>
    )
}

export function LoadMoreButton({ handleClick, disabled, loading, setLoading }: { handleClick: () => Promise<void>, disabled: boolean, loading: boolean, setLoading: (loading: boolean) => void }) {

    return (
        <Button
            variant='contained'
            onClick={async () => { setLoading(true); await handleClick(); setLoading(false) }}
            disabled={disabled}
            loading={loading}
            loadingPosition='end'
        >{loading ? "Loading" : "Load more"}</Button>
    )
}