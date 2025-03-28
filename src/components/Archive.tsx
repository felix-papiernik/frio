"use client";

import { Article, PostsResponse } from '@/lib/types';
import { archiveGridStyles, getSlug } from '@/lib/utils'
import { Grid2, Card, Typography, Button, Stack, Box, Divider } from '@mui/material'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ThumbUp, VisibilityOutlined } from '@mui/icons-material';

export interface ArchiveProps {
    title: string,
    initialPostsData: PostsResponse,
    hidePostsCount?: boolean,
    loadMorePosts: (skip: number) => Promise<Article[]>
}

export default function Archive({ title, initialPostsData, loadMorePosts, hidePostsCount }: ArchiveProps) {

    const [data, setData] = useState(initialPostsData);
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
        setData(initialPostsData);
    }, [initialPostsData]);

    return (
        <Stack direction={"column"} spacing={2} justifyContent={"center"} alignItems={"center"}>
            <Box maxWidth="lg" width="100%">
                <Typography variant={"h1"} sx={{ mb: 2 }}>{title}</Typography>
                {
                    hidePostsCount ? null : <Typography variant='body1' color='textSecondary' mb={1}>Showing {data.posts.length} of {data.total}</Typography>
                }
                <Grid2 container {...archiveGridStyles} mb={2}>
                    {
                        data.posts.map(post => (
                            <Grid2 size={1} key={post.id}>
                                <ArticleCard post={post} />
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

function ArticleCard({ post }: { post: Article }) {
    return (
        <Card sx={{ p: 0, flexGrow: 1, height: "100%" }}>
            <Link href={`/posts/${getSlug(post.id, post.title)}`}>
                <img
                    src={`https://picsum.photos/seed/${post.id}/600/300`}
                    alt={post.title}

                    width={600}
                    height={300}
                />
            </Link>
            <Box p={2} pt={1} >
                <Typography
                    variant={"h6"}
                    component={Link}
                    href={`/posts/${getSlug(post.id, post.title)}`}
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
                    <ThumbUp color='disabled' fontSize='small' />
                    <Typography variant={"body2"} color='textSecondary'>{post.reactions.likes}</Typography>
                </Stack>
                <Typography variant={"body1"} color='textSecondary'>{post.body.slice(0, 100)}...</Typography>
                <Stack direction={"row"} spacing={1} alignItems={"center"} mt={1}>
                    <Typography variant={"body2"} color='textSecondary'>Tags: </Typography>
                    {post.tags.map((tag, index) => (
                        <React.Fragment key={tag}>
                            <Typography component={Link} variant={"body2"} color='secondary' href={"/tags/" + tag} sx={{ "&:hover": { textDecoration: "underline" } }}>{tag}</Typography>
                            {index < post.tags.length - 1 && <Divider orientation='vertical' flexItem />}
                        </React.Fragment>
                    ))}
                </Stack>
            </Box>
        </Card>
    )
}


function LoadMoreButton({ handleClick, disabled, loading, setLoading }: { handleClick: () => Promise<void>, disabled: boolean, loading: boolean, setLoading: (loading: boolean) => void }) {
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