import { Box, Stack } from '@mui/material'
import React from 'react'
import { SearchBar } from './Searchbar';
import { Tag } from '@/lib/types';
import TagLink from './TagLink';
import Logo from './Logo';
import MobileMenu from './MobileMenu';

export default async function Header() {

    const tags = (await fetch('https://dummyjson.com/posts/tags').then(res => res.json()) as Tag[]).slice(0, 9);

    return (
        <Box component="header" pt={2} boxShadow={5}>
            <Stack display={{ lg: "none" }} direction={"row"} alignItems={"center"}  position={"relative"} gap={3} p={2} pt={0}>
                <MobileMenu tags={tags}/>
                <Logo textProps={{ variant: "h1", component: "a" }} />
                <Box sx={{ flexGrow: 1 }} />
            </Stack>
            <Stack display={{ xs: "none", lg: "flex" }} direction={"column"} alignItems={"center"} gap={3}>
                <Logo textProps={{ variant: "h1", component: "a" }} />
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
                        <SearchBar expandable={true}/>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}
