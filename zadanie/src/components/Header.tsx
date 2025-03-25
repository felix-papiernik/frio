import { Stack, Typography } from '@mui/material'
import React from 'react'
import { SearchBar } from './Searchbar';
import Link from 'next/link';

export default async function Header() {

    const tags = (await fetch('https://dummyjson.com/posts/tags').then(res => res.json()) as { slug: string, name: string }[]).slice(0, 8);
    // console.log(tags)

    return (
        <Stack component="header" direction={"column"} alignItems={"center"} gap={3} sx={{ padding: 2 }}>
            <Typography variant={"h1"} component={Link} href={"/"}>BloggyEN</Typography>
            <Stack direction={"row"} spacing={2} alignItems={"center"} justifyContent={"center"}>
                {
                    tags.map(tag => (
                        <Typography key={tag.slug} variant={"button"}>{tag.name}</Typography>
                    ))
                }
                <SearchBar />
            </Stack>
        </Stack>
    )
}
