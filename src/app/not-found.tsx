import { Button, Stack, Typography } from '@mui/material'
import React from 'react'

export default function NotFound() {
    return (
        <Stack direction={"column"} spacing={2} justifyContent={"center"} alignItems={"center"} mb={30}>
            <Typography variant={"h1"}>Error 404</Typography>
            <Typography variant={"caption"}>The page you are looking for can't be found. Please check the URL or return to the homepage.</Typography>
            <Button href="/" variant="contained" color="primary" sx={{ mx: "auto" }}>Go to Home</Button>
        </Stack>
    )
}
