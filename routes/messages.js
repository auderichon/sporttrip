const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const activityModel = require("../models/Activities");
const sportModel = require("../models/Sports");
const userModel = require("../models/Users");
const conversationModel = require("../models/Conversation");

router.get("/", (req, res, next) => {
    console.log("++++++++++++++", req.session.currentUser._id)
    const user = req.session.currentUser._id;
    Promise.all([
        conversationModel
    
            .find({ users: { $elemMatch: { user } } })
            .populate("users"),
        userModel.find()

    ])
        .then((conversations) => {
            console.log("======", conversations);


            res.render("message/message-profile", { title: "Messages", conversations });
        })
        .catch(next)
});
// router.get("/:id",(req,res,next) =>{
//     userModel.findById(req.params.id).then(userDocument => {
//         res.render("message/message-profile", {recipient: userDocument})
//     }).catch(next)

// })


// router.get("/:id", (req,res,next) =>{
//     conversationModel
//     .find(req.session.currentUser._id, userDocument)
//     .then((dbres) =>{
//         if(!dbres){

//         }
//     })

// })
router.post("/:user1id/:user2id", (req, res, next) => {

    const users = [req.params.user1id, req.params.user2id];
    conversationModel
        .findOne({ $or: [{ users: [req.params.user1id, req.params.user2id] }, { users: [req.params.user2id, req.params.user1id] }] })
        .then((dbres) => {
            console.log("=========", dbres);
            if (dbres === null) {
                conversationModel.create({
                    users,
                    messages: [{
                        user: req.params.user2id,
                        content: req.body.content,
                        date: Date.now()

                    }]
                }).then(req.flash("success", "Conversation successfully created"),
                    res.redirect("/"))
                    .catch(next)
            }
            else {

                conversationModel.findByIdAndUpdate(dbres._id, {
                    $push: {
                        messages: {
                            user: req.params.user2id,
                            content: req.body.content,
                            date: Date.now()

                        }
                    }

                })
                    .then(req.flash("success", "Message successfully added"),
                        res.redirect("/"))
                    .catch(next)
            }

        })




        .catch(next)
});




router.get("/delete/:id", (req, res, next) => {
    conversationModel
        .findByIdAndRemove(req.params.id)
        .then(() => res.redirect("/")) //(res.redirect mymessage)
        .catch(next);
});
module.exports = router;