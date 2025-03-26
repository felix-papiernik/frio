import { Typography } from '@mui/material'
import React from 'react'
import Link from 'next/link';
import { Stack } from '@mui/system';

export default function Footer() {

    const links = ["Home", "About", "Contact", "Privacy Policy", "Terms of Service"];

    return (
        <Stack component="footer" alignItems={"center"} sx={{ px: { xs: 2 }, py: { xs: 2, md: 4 }, pt: { lg: 6 }, mt: { xs: 2, md: 4, lg: 6 }, backgroundColor: "#1C1C1C" }}>
            <Stack direction={{ xs: "column", lg: "row" }} gap={{ xs: 2, lg: 14 }} justifyContent={"center"} alignItems={"center"} sx={{ mt: 2 }}>
                {links.map(link => (
                    <Typography component={Link} href={"/#"} key={link} variant='h6' color='lightgrey'>{link}</Typography>
                ))}
            </Stack>
            <Typography variant={"body1"} color='lightgrey' textAlign={"center"} mt={8}>
                © 2021 BloggyEN. All rights reserved.
            </Typography>
        </Stack>
    )
}
