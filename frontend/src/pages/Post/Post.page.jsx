import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container } from "@mantine/core";
import { useLoaderData } from "react-router-dom";

export const PostPage = () => {
  const posts = useLoaderData();

  if (!posts) return <p>Loading...</p>;

  return (
    <Container>
      <SimpleGrid cols={3}>
        {posts?.map((post) => (
          <ArticleCardImage key={post.title} {...post} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export const postsLoader = async () => {

  try {
    const res = await axios.get(`${DOMAIN}/api/posts`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw new Response("Failed to fetch posts", { status: 500 });
  }
};
