"use client";

import { PostsResponse } from '@/app/page'
import { getPosts, getPostsResponse } from '@/utils/actions';
import { getSlug } from '@/utils/functions'
import { Grid2, Card, Typography, Button, TextField, Stack } from '@mui/material'
import Link from 'next/link'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export interface ArchiveProps {
    initialPosts: PostsResponse,
    postsPerPage: number,
}

let changed = false;
export default function Arch({ initialPosts, postsPerPage }: ArchiveProps) {

    const searchParams = useSearchParams();

    const [data, setData] = useState(initialPosts);
    const [reloading, setReloading] = useState(false);
    const [page, setPage] = useState(1);

    async function handleLoadMore() {
        setReloading(true);
        const addPosts = await getPosts(postsPerPage, page * postsPerPage, searchParams.get('query') || undefined);
        setData(prev => ({ ...prev, posts: [...prev.posts, ...addPosts] }));
        setPage(page + 1);
        setReloading(false);
    }

    useEffect(() => {
        if (!changed) return;
        const fetchPosts = async () => {
            setReloading(true);
            const posts = await getPostsResponse(postsPerPage, 0, searchParams.get('query') || undefined);
            setData(posts);
            setReloading(false);
        }
        fetchPosts();
    }, [searchParams.toString()]);

    return (
        <Stack direction={"column"} spacing={2} justifyContent={"center"} alignItems={"center"}>
            <SearchBar />
            <Grid2 container columns={3} columnSpacing={7} rowSpacing={6} sx={{ width: "100%" }}>
                {
                    data.posts.map(post => (
                        <Grid2 size={1} key={post.id}>
                            <Card component={Link} href={`/post/${getSlug(post.id, post.title)}`} sx={{ minWidth: "350px", cursor: "pointer", textDecoration: "none" }}>
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
            </Grid2>
            <LoadMoreButton handleClick={handleLoadMore} disabled={reloading || data.total === data.posts.length} />
        </Stack>
    )
}

export function LoadMoreButton({ handleClick, disabled }: { handleClick: () => void, disabled: boolean }) {

    const [loading, setLoading] = useState(false);

    return (

        <Button
            variant='contained'
            onClick={() => { setLoading(true); handleClick(); setLoading(false) }}
            disabled={disabled}
            loading={loading}
            loadingPosition='end'
        >Load more</Button>
    )
}

export function SearchBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        // history.pushState({}, '', `${pathname}?${params.toString()}`);
        router.replace(`${pathname}?${params.toString()}`);
        changed = true;
    }

    return (
        <TextField
            label='Search'
            placeholder='Search'
            defaultValue={searchParams.get('query')}
            onChange={(e) => { handleSearch(e.target.value) }}
            fullWidth
            sx={{ mx: "auto", maxWidth: "sm", mt: "8px" }}
        />
    )
}
