import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { SearchBar } from './Searchbar';
import Link from 'next/link';
import { Tag } from '@/lib/types';
import TagLink from './TagLink';

export default async function Header() {

    const tags = (await fetch('https://dummyjson.com/posts/tags').then(res => res.json()) as Tag[]).slice(0, 9);

    return (
        <Stack component="header" direction={"column"} alignItems={"center"} gap={3} pt={2}>
            <Typography variant={"h1"} component={Link} href={"/"}>BloggyEN</Typography>
            <Box sx={{ width: "100%", backgroundColor: " #1C1C1C", py: 1 }} >
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                    sx={{ position: "relative", mx: "auto", minHeight: 60 }}
                    maxWidth="lg"
                    width="100%"
                >
                    {tags.map(tag => (
                        <TagLink key={tag.slug} tag={tag} />
                    ))}
                    <SearchBar />
                </Stack>
            </Box>
        </Stack>
    )
}
