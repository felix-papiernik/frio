"use client";

import { Article, PostsResponse } from '@/lib/types';
import { getSlug } from '@/lib/utils'
import { Grid2, Card, Typography, Button, Stack, Box, Divider } from '@mui/material'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ThumbUp, VisibilityOutlined } from '@mui/icons-material';

export interface ArchiveProps {
    initialPosts: PostsResponse,
    hidePostsCount?: boolean,
    loadMorePosts: (skip: number) => Promise<Article[]>
}

export default function Archive({ initialPosts, loadMorePosts, hidePostsCount }: ArchiveProps) {

    const [data, setData] = useState(initialPosts);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    async function handleLoadMore() {
        setLoading(true);
        const addPosts = await loadMorePosts(data.posts.length);
        setData(prev => ({ ...prev, posts: [...prev.posts, ...addPosts] }));
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        setData(initialPosts);
    }, [initialPosts]);

    return (
        <Stack direction={"column"} spacing={2} justifyContent={"center"} alignItems={"center"}>
            <Box maxWidth="lg" width="100%">
                {
                    hidePostsCount ? null : <Typography variant='body1' color='textSecondary' mb={1}>Showing {data.posts.length} of {data.total}</Typography>
                }
                <Grid2 container columns={3} columnSpacing={4} rowSpacing={6}>
                    {
                        data.posts.map(post => (
                            <Grid2 size={1} key={post.id}>
                                <Card sx={{ p: 0, flexGrow: 1, height: "100%" }}>
                                    <img
                                        src={`https://picsum.photos/seed/${post.id}/600/300`}
                                        alt={post.title}
                                        width={600}
                                        height={300}
                                    />
                                    <Box px={2} py={1}>
                                        <Typography
                                            variant={"h6"}
                                            component={Link}
                                            href={`/post/${getSlug(post.id, post.title)}`}
                                            sx={{
                                                textDecoration: "none",
                                                "&:hover": {
                                                    color: "primary.main",
                                                    transition: "color 0.2s ease-in-out"
                                                },
                                                lineHeight: "1.1em"
                                            }}
                                        >
                                            {post.title}
                                        </Typography>
                                        <Stack direction={"row"} spacing={1} alignItems={"center"} mb={1} mt={"2px"}>
                                            <VisibilityOutlined color='disabled' />
                                            <Typography variant={"body2"} color='textSecondary' fontSize='small'>{post.views}</Typography>
                                            <Divider orientation='vertical' flexItem />
                                            <ThumbUp color='disabled' fontSize='small'/>
                                            <Typography variant={"body2"} color='textSecondary'>{post.reactions.likes}</Typography>
                                        </Stack>
                                        <Typography variant={"body1"} color='textSecondary'>{post.body.slice(0, 100)}...</Typography>
                                        <Typography variant={"body2"}>Tags: {post.tags.join(', ')}</Typography>
                                    </Box>
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