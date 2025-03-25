import { Article } from '@/app/page';
import { Box, Typography } from '@mui/material';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function page({ params }: { params: Promise<{ slug: string }> }) {

    const postSlug = (await params).slug;

    const id = parseInt(postSlug.split('-')[0]);

    const res = await fetch(`https://dummyjson.com/posts/${id}`);
    const data = await res.json();

    if (data.message) {
        notFound();
    }

    const post = data as Article;


    return (
        <Box>
            <Typography variant={"h1"}>{post.title}</Typography>
            <Typography variant={"body1"}>{post.body}</Typography>
        </Box>
    )
}
