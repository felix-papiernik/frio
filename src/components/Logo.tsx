import { Typography, TypographyProps } from '@mui/material'
import Link from 'next/link'
import React from 'react'

export default function Logo({ textProps }: { textProps?: TypographyProps }) {
    return (
        <Typography component={Link} href={"/"} {...textProps}>BloggyEN</Typography>
    )
}
