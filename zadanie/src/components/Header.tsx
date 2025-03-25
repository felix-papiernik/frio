import { Stack, Typography } from '@mui/material'
import React from 'react'

export default async function Header() {

    const tags = (await fetch('https://dummyjson.com/posts/tags').then(res => res.json()) as { slug: string, name: string }[]).slice(0, 5);
    // console.log(tags)

    return (
        <Stack component="header" direction={"row"} alignItems={"center"} justifyContent={"center"} sx={{ padding: 2, backgroundColor: "primary.main", color: "primary.contrastText" }}>
            <Stack direction={"row"} spacing={2}>
                {
                    tags.map(tag => (
                        <Typography key={tag.slug} variant={"button"}>{tag.name}</Typography>
                    ))
                }
            </Stack>
        </Stack>
    )
}
