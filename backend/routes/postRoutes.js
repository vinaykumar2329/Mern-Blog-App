const express = require("express");
const router = express.Router();

const { getAllPost, createPostController, updatePostController, deletePostController, getPostByIdController,  userPostController, } = require("../controllers/postController");

router.get("/all-post",getAllPost);

router.post("/create-post",createPostController);

router.put("/update-post/:id",updatePostController);

router.get("/get-post/:id",getPostByIdController);

router.delete("/delete-post/:id",deletePostController);

router.get("/user-post/:id",userPostController);


module.exports = router;