export const getSlug = (id: number, title: string) => {
    return `${id}-${title.toLowerCase().replace(/ /g, '-')}`;
}

export const postsPerPage = 6;

export const delayMs = 1000;