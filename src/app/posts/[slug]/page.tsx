import BackButton from '@/components/BackButton';
import { Article } from '@/lib/types';
import { Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { notFound } from 'next/navigation';
import React from 'react'
import Image from "next/image";

export default async function page({ params }: { params: Promise<{ slug: string }> }) {

    const postSlug = (await params).slug;

    const id = parseInt(postSlug.split('-')[0]);

    const res = await fetch(`https://dummyjson.com/posts/${id}?delay=1000`);
    const data = await res.json();

    if (data.message) {
        notFound();
    }

    const post = data as Article;

    return (
        <>
            <BackButton />
            <Typography variant={"h1"}>{post.title}</Typography>
            <Stack direction={"row"} spacing={2} alignItems={"center"} mb={2}>
                <Typography variant={"body1"} color={"textSecondary"} component={"span"}>Author: John Doe</Typography>
                <Divider orientation={"vertical"} flexItem />
                <Typography variant={"body1"} color={"textSecondary"} component={"span"}>26.3.2025</Typography>
            </Stack>
            <Image
                src={`https://picsum.photos/seed/${post.id}/900/500`}
                alt={post.title}
                width={900}
                height={500}
                style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                }}
                priority // ⬅️ loads eagerly, no flicker
            />
            <Typography variant={"body1"} mt={1}>{post.body}</Typography>
        </>
    )
}
