import Archive from "@/components/Archive";
import { postsPerPage } from "@/lib/utils";
import { getMorePosts, getPostsResponse } from "@/lib/actions";

export default async function Home() {

  const postsData = await getPostsResponse(postsPerPage, 0);

  return (
    <Archive
      title="Latest Posts"
      hidePostsCount={true}
      initialPostsData={postsData}
      loadMorePosts={async (skip: number) => {
        "use server";
        return await getMorePosts(postsPerPage, skip);
      }}
    />
  )
}
