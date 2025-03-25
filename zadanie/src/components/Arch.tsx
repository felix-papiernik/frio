"use client";

import { PostsResponse } from '@/app/page'
import { getPosts, getPostsResponse } from '@/utils/actions';
import { getSlug } from '@/utils/functions'
import { Search } from '@mui/icons-material';
import { Grid2, Card, Typography, Button, TextField, Stack, Box, OutlinedInput, FormControl, InputLabel, CircularProgress } from '@mui/material'
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
            <SearchBar loading={reloading} setIsLoading={setReloading} />
            <Box maxWidth="lg" width="100%">
                <Grid2 container columns={3} columnSpacing={7} rowSpacing={6}>
                    {
                        data.posts.map(post => (
                            <Grid2 size={1} key={post.id}>
                                <Card sx={{ ursor: "pointer", textDecoration: "none", p: 2 }}>
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
            <LoadMoreButton handleClick={handleLoadMore} disabled={reloading || data.total === data.posts.length} />
        </Stack>
    )
}

export function LoadMoreButton({ handleClick, disabled }: { handleClick: () => Promise<void>, disabled: boolean }) {

    const [loading, setLoading] = useState(false);

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

export function SearchBar({ loading, setIsLoading }: { loading: boolean, setIsLoading: (loading: boolean) => void }) {
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
        <FormControl sx={{ width: "25rem" }}>
            <InputLabel htmlFor='search'>Search</InputLabel>
            <OutlinedInput
                id='search'
                label='Search'
                placeholder='Search...'
                defaultValue={searchParams.get('query')}
                onChange={(e) => {
                    setIsLoading(true);
                    handleSearch(e.target.value);
                    setIsLoading(false);
                }}
                // sx={{borderRadius: 8}}
                endAdornment={loading ? <CircularProgress size={20} /> : <Search />}
            />
        </FormControl>
    )
}
