import { Link, useNavigate } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useState } from "react";
import { Button, Container, TextInput, Textarea, Group, Paper, Title } from "@mantine/core";
import { useLoaderData } from "react-router-dom";

function PostEditPage() {
  const post = useLoaderData();
  const navigate = useNavigate();

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [category, setCategory] = useState(post.category);
  const [image, setImage] = useState(post.image);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedPost = { title, content, category, image };

    try {
      await axios.post(`${DOMAIN}/api/posts/${post.id}/edit`, updatedPost);
      navigate(`/posts/${post.id}`); // Redirect to the post details page after update
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <Container>
      <Paper withBorder shadow="sm" p="md" mb="md">
        <Title order={2}>Edit Post</Title>
      </Paper>
      <form onSubmit={handleSubmit}>
        <Paper withBorder shadow="sm" p="md" mb="md">
          <TextInput
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Paper>
        <Paper withBorder shadow="sm" p="md" mb="md">
          <Textarea
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Paper>
        <Paper withBorder shadow="sm" p="md" mb="md">
          <Textarea
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Paper>
        <Paper withBorder shadow="sm" p="md" mb="md">
          <TextInput
            label="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Paper>
        <Group position="right" mt="md" spacing="md">
          <Button type="submit">Update Post</Button>
          <Button component={Link} to={`/posts/${post.id}`}>Cancel</Button>
        </Group>
      </form>
    </Container>
  );
}

export default PostEditPage;
