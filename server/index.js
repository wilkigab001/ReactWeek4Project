require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { SERVER_PORT } = process.env;

const {
  getAllPosts,
  getCurrentUsersPosts,
  addPost,
  editPosts,
  deletePosts,
} = require("./controllers/posts.js");
const { isAuthenticated } = require("./middleware/isAuthenticated");
const { login, register } = require("./controllers/auth");

const app = express();
const { sequelize } = require("./util/database");
const { User } = require("./models/user");
const { Post } = require("./models/post");

app.use(express.json());
app.use(cors());

User.hasMany(Post);
Post.belongsTo(User);

app.post("/register", register);
app.post("/login", login);

app.get("/posts", getAllPosts);

app.get("/userposts/:userId", getCurrentUsersPosts);
app.post("/posts", isAuthenticated, addPost);
app.put("/posts/:id", isAuthenticated, editPosts);
app.delete("/posts/:id", isAuthenticated, deletePosts);
//use force: true to make surethe database is updated
sequelize.sync().then(() => {
  app.listen(SERVER_PORT, () => {
    console.log("listening on port " + SERVER_PORT);
  });
}).catch((err) => console.log(err))
