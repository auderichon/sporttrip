const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const activityModel = require("../models/Activities");
const sportModel = require("../models/Sports");
const userModel = require("../models/Users");
const conversationModel = require("../models/Conversation");

router.get("/",(req,res,next) =>{
    console.log( ">>>>>>>>>" ,req.session.currentUser)
    conversationModel 
    .find({users: req.session.currentUser._id})
    .then((conversations)=>{
        
        res.render("message/message-profile", {title:"New message", conversations});
    })
    .catch(next)
});
router.get("/:id",(req,res,next) =>{
    userModel.findById(req.params.id).then(userDocument => {
        res.render("message/message-profile", {recipient: userDocument})
    }).catch(next)

})


router.get("/:id", (req,res,next) =>{
    conversationModel
    .find(req.session.currentUser._id, userDocument)
    .then((dbres) =>{})
    
})
router.post("/:id",(req,res, next) =>{
    const {users,message} = req.body;

//regarder si une conversation existe déjà entre ces deux users, du coup update l'array de messages, sinon creer une conversation

    conversationModel
    .create({
        users:req.session.currentUser._id,
        message,

    })
    .then(() => {
        req.flash("success", "message successfully created");
        res.redirect("/");
      })
      .catch(next);
  });

    


router.get("/delete/:id", (req, res, next) => {
    conversationModel 
      .findByIdAndRemove(req.params.id)
      .then(() => res.redirect("/")) //(res.redirect mymessage)
      .catch(next);
  });
module.exports = router;