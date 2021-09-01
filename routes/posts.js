const express = require("express");
const router = express.Router();

//  Load model
const Post = require("../models/Post");

// Hien thij tat ca bai viet
router.get("/", async (req, res) => {
  const posts = await Post.find().lean().sort({ date: -1 });
  res.render("posts/index", { posts });
});

// Hien thị form tạo post
router.get("/add", (req, res) => {
  res.render("posts/add");
});

//  Tao post moi
router.post("/", async (req, res) => {
  const { title, text } = req.body;

  let errors = [];

  if (!title) errors.push({ message: "Title required" });
  if (!text) errors.push({ message: "Text required" });
  if (errors.length > 0) res.render("posts/add", { errors, title, text });
  else {
    const newPostData = { title, text };
    const newPost = new Post(newPostData);
    await newPost.save();
    res.redirect("/posts");
  }
});

// Hien thi form edit post
router.get("/edit/:id", async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id }).lean();
  res.render("posts/edit", { post });
});

// Hien thi form edit post
router.delete("/:id", async (req, res) => {
  const post = await Post.findOneAndRemove({ _id: req.params.id });
  res.redirect("/posts");
});

// Cap nhat bai viết
router.put("/:id", async (req, res) => {
  const { title, text } = req.body;
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id },
    { title, text }
  );
  res.redirect("/posts");
});

module.exports = router;
