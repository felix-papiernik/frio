import { Grid2Props } from "@mui/material";

export const getSlug = (id: number, title: string) => {
    return `${id}-${title.toLowerCase().replace(/ /g, '-')}`;
}

export const postsPerPage = 9;

export const archiveGridStyles: Grid2Props = {
    columns: { xs: 1, sm: 2, lg: 3 }, 
    columnSpacing: 4, 
    rowSpacing: 6
}

export const delayMs = 1000;