import { Link } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container } from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import { Grid, Paper, Text, Title, Group } from "@mantine/core";
import useBoundStore from "../../store/Store";

function PostDetailsPage() {

  const post = useLoaderData();
  const { user } = useBoundStore((state) => state);

  if (!post) return <p>Loading...</p>;

  return (
    <>
      <Container>
        <Grid>
          <Grid.Col span={8}>
            <Paper withBorder shadow="sm" p="md" mb="md">
              <Text size="sm" weight={700}>
                Author: {post.author}
              </Text>
            </Paper>
            <Paper withBorder shadow="sm" p="md" mb="md">
              <Title order={2}>{post.title}</Title>
            </Paper>
            <Paper withBorder shadow="sm" p="md" mb="md">
              <Text size="sm">Category: {post.category}</Text>
            </Paper>
            <Paper withBorder shadow="sm" p="md">
              <Text>{post.content}</Text>
            </Paper>
          </Grid.Col>
          <Grid.Col span={4}>
            <Paper withBorder shadow="sm" p="md" style={{ height: "100%" }}>
              <img src={post.image} alt="Post" style={{ width: "100%", height: "auto" }} />
            </Paper>
          </Grid.Col>
        </Grid>
        <br></br>
        <Group position="right" mt="md" spacing="md">
          {user.id === post.userId && (
            <Button component={Link} to={`/posts/${post.id}/edit`}>Edit</Button>
          )}
          <Button component={Link} to="/posts">Back</Button>
        </Group>
      </Container>
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {

  try {
    const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch post:", error);
    throw new Response("Failed to fetch post", { status: 500 });
  }
  return null;
};

export default PostDetailsPage;
