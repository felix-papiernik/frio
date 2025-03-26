"use client";

import { Close, Menu } from '@mui/icons-material';
import { Dialog, IconButton, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react'
import Logo from './Logo';
import { SearchBar } from './Searchbar';
import { Tag } from '@/lib/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileMenu({ tags }: { tags: Tag[] }) {

    const [open, setOpen] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <>
            <IconButton aria-label="menu" onClick={() => setOpen(true)}>
                <Menu fontSize='large' />
            </IconButton>
            <Dialog open={open} onClose={() => setOpen(false)} fullScreen sx={{ display: { lg: "none" } }}>
                <Box p={2} sx={{ backgroundColor: "white", display: "flex", flexDirection: "column", minHeight: "100vh", maxWidth: "sm" }}>
                    <Stack direction={"row"} gap={3}>
                        <IconButton aria-label="close" onClick={() => setOpen(false)}>
                            <Close fontSize='large' />
                        </IconButton>
                        <Logo textProps={{ variant: "h1" }} />
                    </Stack>
                    <Box maxWidth={"sm"} mt={4}>
                        <SearchBar />
                    </Box>
                    <Typography variant={"h6"} mt={2}>Tags</Typography>
                    {tags.map(tag => (
                        <Typography component={Link} key={tag.slug} href={"/tags/" + tag.slug} color='textPrimary' ml={2} mt={1}>{tag.name}</Typography>
                    ))}
                </Box>
            </Dialog>
        </>
    )
}
