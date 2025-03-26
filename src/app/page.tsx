import Archive from "@/components/Archive";
import { delayMs, postsPerPage } from "@/lib/utils";
import { PostsResponse } from "@/lib/types";

export default async function Home() {

  const res = await fetch(`https://dummyjson.com/posts/search?limit=${postsPerPage}&delay=${delayMs}`)
  const data = await res.json()
  const initPostsRes = data as PostsResponse;

  return (
    <Archive
      title="Latest Posts"
      hidePostsCount={true}
      initialPosts={initPostsRes}
      loadMorePosts={async (skip: number) => {
        "use server";
        const response = await fetch(`https://dummyjson.com/posts/search?limit=${postsPerPage}&skip=${skip}&delay=${delayMs}`);
        const json = await response.json();
        return (json as PostsResponse).posts;
      }}
    />
  )
}
