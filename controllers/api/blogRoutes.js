const express = require("express");
const router = express.Router();
const {User, Blog, Comment} = require("../../models");
const withAuth = require('../../util/auth')

router.get("/", (req, res) => {
    Blog.findAll({include:[User, Comment]})
      .then(dbBlogs => {
        res.json(dbBlogs);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "You have encountered an error", err });
      });
  });

router.get("/:id", (req, res) => {
    Blog.findByPk(req.params.id,{include:[User, Comment]})
      .then(dbBlog => {
        res.json(dbBlog);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "You have encountered an error", err });
      });
});

router.post("/", (req, res) => {
    if(!req.session.user){
      return res.status(401).json({msg:"Please login first!"})
    }
    Blog.create({
      title:req.body.title,
      content:req.body.content,
      userId:req.session.user.id
    })
      .then(newBlog => {
        res.json(newBlog);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "You have encountered an error", err });
      });
});

router.put("/:id", (req, res) => {
  if(!req.session.user){
    return res.status(401).json({msg:"Please login!"})
  }
  Blog.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(updatedBlog => {
      res.json(updatedBlog);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "You have encountered an error", err });
    });
});

router.delete("/:id", (req, res) => {
  if(!req.session.user){
    return res.status(401).json({msg:"Please login!"})
  }
    Blog.destroy({
      where: {
        id: req.params.id
      }
    }).then(delBlog => {
      res.json(delBlog);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "You have encountered an error", err });
    });
});
  
module.exports = router;