import { Skeleton, Typography } from '@mui/material'
import React from 'react'

export default function Loading() {
    return (
        <>
            <Skeleton width={100} height={40} />
            <Typography variant={"h1"}>
                <Skeleton width={500} />
            </Typography>
            <Typography variant={"body1"} sx={{ mb: 2 }}>
                <Skeleton width={270} />
            </Typography>
            <Skeleton width={900} height={500} variant='rectangular' />
        </>
    )
}
