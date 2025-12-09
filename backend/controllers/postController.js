const postModel = require("../models/postModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");
// Creating Post
exports.createPostController = async (req,res) => {
    try{
        const{title,content,image,user} = req.body;
        const existingUser = await userModel.findById(user)
        if(!existingUser){
            res.status(404).send({
                success:false,
                message:"No user found"
            })
        }

        const post = new postModel({title,content,image,user})
        existingUser.posts.push(post)
        await existingUser.save()
        await post.save()
        return res.status(201).send({
            success:true,
            message:"new post created",
            post,
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error in creating post",
            error
        })
    }
}


// Get All Post
exports.getAllPost = async(req,res) =>{
    try{
        const posts = (await postModel.find({}).populate("user")).sort({createdAt:+1});
        if(posts.length>0){
            return res.status(200).send({
            success:true,
            message:"all post data",
            posts
        })
        }
        return res.status(200).send({
            success:true,
            message:"No Post Found",
        })
        
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error in getting all post",
            error
        })
    }
}


// Update Post
exports.updatePostController = async(req,res) =>{
    try{
        const{id}= req.params
        const{title,content,image} = req.body;
       
        const post = await postModel.findByIdAndUpdate(id,{title,content,image},{new:true})
        return res.status(200).send({
            success:true,
            message:"post updated",
            post
        })

    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error in updating post",
            error
        })
    }
}


// Get Post By Id
exports.getPostByIdController = async(req,res) => {
    try{
        const {id} = req.params
        const post = await postModel.findById(id).populate("user")
        return res.status(200).send({
            success:true,
            message:"post founded by id",
            post
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error in getting post by id",
            error
        })
    }

}


// Delete Post
exports.deletePostController = async(req,res) => {
    try{
        
        const post = await postModel.findByIdAndDelete(req.params.id).populate("user");
        await post.user.posts.pull(post._id);
        await post.user.save()
        return res.status(200).send({
            success:true,
            message:"post deleted by id",
            post
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error in deleting post",
            error
        })
    }

}

exports.userPostController = async(req,res) => {
    try{
        const {id} = req.params
        const userBlog = await userModel.findById(id).populate("posts");
        if(!userBlog){
             return res.status(404).send({
            success:false,
            message:"No posts found with this user id",
        })
        }
        return res.status(200).send({
            success:true,
            message:"user posts",
            userBlog
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error in finding post",
            error
        })
    }

}

