import { Link, useLoaderData } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container } from "@mantine/core";

function PostDetailsPage() {

  const postDetails = useLoaderData();

  return (
    <>
      <Container>
        <p>This page shows post details!</p>
        {postDetails ? (
          <div>
            <h1>{postDetails.title}</h1>
            <p>{postDetails.body}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <Button>
          <Link to="/posts">Back to Posts</Link>
        </Button>
      </Container>
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  const postId = params?.id;
  if (!postId) return null;

  try {
    const response = await axios.get(`${DOMAIN}/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch post details:", error);
  }
  return null;
};

export default PostDetailsPage;
