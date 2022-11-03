require("dotenv").config();
const { Post } = require("../models/post");
const { User } = require("../models/user");

module.exports = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.findAll({
        where: { privateStatus: false },
        include: [
          {
            model: User,
            required: true,
            attributes: [`username`],
          },
        ],
      });
      res.status(200).send(posts);
    } catch (error) {
      console.log("ERROR IN getAllPosts");
      console.log(error);
      res.sendStatus(400);
    }
  },

  getCurrentUsersPosts: async (req, res) => {
    try {
    const {userId} = req.params
      const posts = await Post.findAll({
        where: { userId: userId },
        include: [
          {
            model: User,
            required: true,
            attributes: [`username`],
          },
        ],
      });
      res.status(200).send(posts);
    } catch (error) {
      console.log("error in get posts");
      console.log(error);
      res.sendStatus(400);
    }
  },

  addPost: async (req, res) => {
    try {
      const { title, content, status, userId } = req.body;
      await Post.create({ title, content, status, userId });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      console.log("Cannot add post");
      res.sendStatus(400);
    }
  },

  editPosts: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await Post.update(
        { privateStatus: status },
        {
          where: { id: +id },
        }
      );
    } catch (err) {
      console.log(err);
      console.log("Cannot edit");
      res.sendStatus(400);
    }
  },

  deletePosts: async(req, res) => {
    try {
        const { id } = req.params;
        await Post.delete(
          {
            where: { id: +id },
          }
        );
      } catch (err) {
        console.log(err);
        console.log("Cannot delete");
        res.sendStatus(400);
      }
  },
};
