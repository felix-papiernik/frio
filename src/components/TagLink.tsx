"use client";

import { Tag } from '@/lib/types';
import { Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function TagLink({ tag }: { tag: Tag }) {

    const pathname = usePathname();
    const isActive = pathname.startsWith('/tags/' + tag.slug);

    return (
        <Typography
            variant={"button"}
            component={Link}
            href={"/tags/" + tag.slug}
            sx={{
                backgroundColor: isActive ? 'primary.main' : 'transparent',
                color: isActive ? 'black' : 'primary.main',
                "&:hover": {
                    backgroundColor: "primary.main",
                    color: "black",
                },
                transition: "all 0.2s ease",
                padding: 1,
                textUnderlineOffset: 2

            }}
        >
            {tag.name}
        </Typography>
    )
}
