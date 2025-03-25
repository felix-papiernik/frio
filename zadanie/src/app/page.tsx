import { Box } from "@mui/material";
import Arch from "@/components/Arch";

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

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string
  }>
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  console.log("query", query);

  const limitPerPage = 3;

  const res = await fetch(`https://dummyjson.com/posts/search?q=${query}&limit=${limitPerPage}&skip=0&delay=1000`)
  const data = await res.json()
  const initPostsRes = data as PostsResponse;

  // console.log("initPostsRes", initPostsRes);

  return (
    <Box maxWidth={"lg"} margin={"auto"} padding={2}>
      <Arch
        initialPosts={initPostsRes}
        postsPerPage={limitPerPage}
      />
    </Box>
  )
}
