import Archive from '@/components/Archive';
import { postsPerPage } from '@/lib/utils';
import { PostsResponse, Tag } from '@/lib/types';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {

    const slug = (await params).slug;

    const tags = (await fetch('https://dummyjson.com/posts/tags').then(res => res.json()) as Tag[])
    const tag = tags.find(tag => tag.slug === slug);

    if (!tag) {
        notFound();
    }

    const postsRes = await fetch(`https://dummyjson.com/posts/tag/${slug}?limit=${postsPerPage}`);
    const data = await postsRes.json();
    const postsData = data as PostsResponse;


    return (
        <>
            <Archive
                title={`Posts by tag: ${tag.name}`}
                initialPosts={postsData}
                loadMorePosts={async (skip: number) => {
                    "use server";
                    const response = await fetch(`https://dummyjson.com/posts/tag/${slug}?limit=${postsPerPage}&skip=${skip}`);
                    const json = await response.json();
                    return (json as PostsResponse).posts;
                }}
            />
        </>
    )
}