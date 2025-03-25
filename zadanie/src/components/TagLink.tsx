"use client";

import { Tag } from '@/lib/types';
import { Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function TagLink({ tag }: { tag: Tag }) {

    const pathname = usePathname();
    const isActive = pathname.startsWith('/tags/' + tag.slug);

    //todo color background when active

    return (
        <Typography
            variant={"button"}
            component={Link}
            href={"/tags/" + tag.slug}
            color={isActive ? 'primary.main' : 'text.primary'}
            sx={{ '&:hover': { color: 'primary.main' } }}
        >
            {tag.name}
        </Typography>
    )
}
