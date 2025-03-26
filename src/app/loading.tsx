import { archiveGridStyles, postsPerPage } from '@/lib/utils'
import { Box, Grid2, Skeleton, Typography } from '@mui/material'
import React from 'react'

export default function Loading() {
    return (
        <Box
            maxWidth="lg"
            mx="auto"
            py={2}
            width="100%"
        >
            <Typography variant={"h1"} sx={{ mb: 2 }}>
                <Skeleton width={500} />
            </Typography>
            <Typography variant={"body1"} sx={{ mb: 1 }}>
                <Skeleton width={200} />
            </Typography>

            <Grid2 container {...archiveGridStyles}>
                {Array.from({ length: postsPerPage }).map((_, i) => (
                    <Grid2 size={1} key={i}>
                        <Skeleton variant="rounded" height={400} />
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    )
}
