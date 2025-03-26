import Archive from "@/components/Archive";
import { postsPerPage } from "@/lib/utils";
import { getMorePosts, getPostsResponse } from "@/lib/actions";

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string
    }>
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query;

    const postsData = await getPostsResponse(postsPerPage, 0, query);

    return (
        <Archive
            title={`Search results for: ${query}`}
            initialPostsData={postsData}
            loadMorePosts={async (skip: number) => {
                "use server";
                return await getMorePosts(postsPerPage, skip, query);
            }}
        />
    )
}
