"use client";

import { ArrowBack } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function BackButton() {

    const router = useRouter();

    return (
        <Button onClick={() => router.back()} variant='text' startIcon={<ArrowBack />}>Back</Button>
    )
}
