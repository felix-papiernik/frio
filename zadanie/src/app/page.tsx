import { Box } from "@mui/material";
import Arch from "@/components/Arch";
import { postsPerPage } from "@/utils/functions";

export type Article = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

export type PostsResponse = {
  limit: number;
  posts: Article[];
  skip: number;
  total: number;
}

export default async function Home() {

  const res = await fetch(`https://dummyjson.com/posts/search?limit=${postsPerPage}&skip=0&delay=1000`)
  const data = await res.json()
  const initPostsRes = data as PostsResponse;

  // console.log("initPostsRes", initPostsRes);

  return (
    <Box maxWidth={"lg"} margin={"auto"} padding={2}>
      <Arch
        initialPosts={initPostsRes}
        postsPerPage={postsPerPage}
        loadMorePosts={async (skip: number) => {
          "use server";
          const response = await fetch(`https://dummyjson.com/posts/search?limit=${postsPerPage}&skip=${skip}&delay=1000`);
          const json = await response.json();
          return (json as PostsResponse).posts;
        }}
      />
    </Box>
  )
}
