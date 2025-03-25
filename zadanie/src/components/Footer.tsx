import { Stack, Typography } from '@mui/material'
import React from 'react'

export default function Footer() {
    return (
        <Stack component="footer" direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ padding: 2, backgroundColor: "primary.main", color: "primary.contrastText" }}>
            <Typography variant={"h2"}>Footer</Typography>
        </Stack>
    )
}
