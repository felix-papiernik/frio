"use client";

import { Search } from "@mui/icons-material";
import { IconButton, TextField, useTheme } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

export function SearchBar() {

    const theme = useTheme();

    const pathname = usePathname();
    const params = useSearchParams();
    const router = useRouter();

    const [searchText, setSearchText] = useState('');
    const [focused, setFocused] = useState(false);

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setSearchText('');
        setFocused(false);
        inputRef.current?.blur();
    }, [pathname, params]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        router.push(`/search?query=${searchText.toString()}`);
    }

    return (
        <form onSubmit={handleSubmit}
            style={{
                position: focused ? "absolute" : "relative",
                right: focused ? 0 : undefined,
                width: "100%",
                transition: "all 0.3s ease",
                zIndex: 10,
                backgroundColor: "#1C1C1C",
            }}
        >
            <TextField
                inputRef={inputRef}
                hiddenLabel
                value={searchText}
                placeholder="Type and press enter to search"
                onChange={(e) => setSearchText(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                slotProps={{
                    input: {
                        endAdornment: <IconButton type="submit"
                            sx={{ cursor: "pointer", "&:hover": { cursor: "pointer" } }}>
                            <Search color='primary' />
                        </IconButton>
                    }
                }}
                color="primary"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        color: theme.palette.primary.main,
                        '& fieldset': {
                            borderColor: focused ? theme.palette.primary.main : theme.palette.primary.dark,
                            color: theme.palette.primary.main,
                            opacity: focused ? 1 : 0.7,
                        },
                        '&:hover fieldset': {
                            borderColor: theme.palette.primary.main,
                            opacity: 1
                        },
                        '& input::placeholder': {
                            color: theme.palette.primary.main,
                            opacity: 0.7
                        },
                        '&:hover input::placeholder': {
                            color: theme.palette.primary.main,
                            opacity: 1
                        }
                    },
                }}
                size="medium"
                fullWidth
            />
        </form>
    )
}