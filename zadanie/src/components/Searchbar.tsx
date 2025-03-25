"use client";

import { Search } from "@mui/icons-material";
import { FormControl, InputLabel, IconButton, FilledInput } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export function SearchBar() {

    const pathname = usePathname();
    const params = useSearchParams();
    const router = useRouter();

    const [searchText, setSearchText] = useState(params.get('query') || '');

    useEffect(() => {
        const query = params.get('query');
        setSearchText(query || '');
    }, [pathname]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        router.push(`/search?query=${searchText.toString()}`);
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormControl sx={{ width: "25rem" }}>
                <InputLabel htmlFor='search'>Search</InputLabel>
                <FilledInput
                    id='search'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    endAdornment={<IconButton type="submit"
                        disabled={searchText === ""}
                        sx={{ cursor: "pointer" }}>
                        <Search color='success' />
                    </IconButton>
                    }
                />
            </FormControl>
        </form>
    )
}