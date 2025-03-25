import Archive from '@/components/Archive';
import { postsPerPage } from '@/lib/utils';
import { PostsResponse, Tag } from '@/lib/types';
import { Typography } from '@mui/material';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {

    const postSlug = (await params).slug;

    const tags = (await fetch('https://dummyjson.com/posts/tags').then(res => res.json()) as Tag[])
    const tag = tags.find(tag => tag.slug === postSlug);

    if (!tag) {
        notFound();
    }

    const postsRes = await fetch(`https://dummyjson.com/posts/tag/${postSlug}?limit=${postsPerPage}`);
    const data = await postsRes.json();
    const postsData = data as PostsResponse;


    return (
        <>
            <Typography variant={"h1"}>Posts by tag: {tag.name}</Typography>
            <Archive
                initialPosts={postsData}
                loadMorePosts={async (skip: number) => {
                    "use server";
                    const response = await fetch(`https://dummyjson.com/posts/tag/${postSlug}?limit=${postsPerPage}&skip=${skip}`);
                    const json = await response.json();
                    return (json as PostsResponse).posts;
                }}
            />
        </>
    )
}