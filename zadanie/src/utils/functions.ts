

export const getSlug = (id: number, title: string) => {
    return `${id}-${title.toLowerCase().replace(/ /g, '-')}`;
}