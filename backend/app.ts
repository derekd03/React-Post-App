import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
  findUserById,
  IDecodedUser,
  verifyUser,
  parseToken,
  addPost,
  posts,
  sleep,
} from "./fakedb";
import dotenv from "dotenv";

const port = 8085;
const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
// Securely load the signing key from environment variables
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";

// Middleware to authenticate the token
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  const token = parseToken(authHeader, res);
  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.post("/api/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "2 days" });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/user/validation", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret");
    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.get("/api/posts", authenticateToken, async (req, res) => {
  await sleep(1000);
  res.json(posts);
});

app.get("/api/posts/:id", authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(post => post.id === id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

app.post("/api/posts/:id/edit", authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(post => post.id === id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  const { title, category, content, image } = req.body;

  if (!title || !content || !content || !image) {
    return res.status(400).json({ error: "Title and content are required." });
  }

  post.title = title;
  post.category = category;
  post.content = content;
  post.image = image;

  res.status(200).json({ success: true, post });
})

/**
 * Problems with this:
 * (1) Authorization Issues:
 *     What if you make a request to this route WITHOUT a token?
 *     What if you make a request to this route WITH a token but
 *     it's invalid/expired?
 * (2) Server-Side Validation Issues:
 *     What if you make a request to this route with a valid token but
 *     with an empty/incorrect payload (post)
 */
app.post("/api/posts", authenticateToken, (req, res) => {
  const incomingPost = req.body;
  if (!incomingPost.title || !incomingPost.content) {
    return res.status(400).json({ error: "Title and content not provided." });
  }
  addPost(incomingPost);
  res.status(200).json({ success: true });
});

app.listen(port, () => console.log("Server is running"));
