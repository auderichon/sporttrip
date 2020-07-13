require("dotenv").config();
require("./../config/dbconfig");

// all models
const activityModel = require("../models/Activities");
const sportModel = require("../models/Sports");
const userModel = require("../models/Users");
const reviewModel = require("../models/Reviews");

// all seeds
const sportsList = require("./Sports.seeds");
const usersList = require("./Users.seeds");
const activitiesList = require("./Activities.seeds");
const reviewsList = require("./Reviews.seeds");

// seeding

async function sendAllSeeds() {
   try {
      const allSports = await sportModel.create(sportsList);
      //console.log(allSports);

      usersList.forEach((user) => {
         userSports = user.sports; //represents an array of { sport + level } = sportObjects

         userSports.forEach((sportObjects) => {
            // console.log("all sports", allSports);
            let filteredArray = allSports.filter((sport) => {
               return sport.name === sportObjects.sport;
            });
            let id = filteredArray[0].id;
            sportObjects.sport = id;
         });
      });

      const cleanUserList = await userModel.create(usersList);
      console.log("CLEAN USERS LIST =====> ", cleanUserList);

      reviewsList.forEach((review) => {
         //find the reviewed user
         let filteredArray1 = cleanUserList.filter((user) => {
            return user.firstName === review.reviewedUser;
         });
         let id1 = filteredArray1[0].id;
         review.reviewedUser = id1;

         //find the reviewer
         let filteredArray2 = cleanUserList.filter((user) => {
            return user.firstName === review.reviewerName;
         });
         let id2 = filteredArray2[0].id;
         console.log("REVIEWER : ", id2);
         review.reviewerName = id2;
      });

      const cleanReviewsList = await reviewModel.create(reviewsList);
      console.log("CLEAN REVIEWS LIST =====> ", cleanReviewsList);

      activitiesList.forEach((activity) => {
         // find the sport ID
         let filteredArraySports = allSports.filter((sport) => {
            return sport.name === activity.sport;
         });
         let id1 = filteredArraySports[0].id;
         activity.sport = id1;

         // find the creator ID
         let filteredArrayCreator = cleanUserList.filter((user) => {
            return user.firstName === activity.creator;
         });
         let id2 = filteredArrayCreator[0].id;
         activity.creator = id2;

         // find all participants ID

         let activityParticipants = activity.participants;
        
         activityParticipants.forEach((participant) => {
            let filteredArray = cleanUserList.filter((user) => {
               return user.firstName === participant.participantID;
            });
            let id3 = filteredArray[0].id;
            participant.participantID = id3;
         });
      });
      const cleanActivitiesList = await activityModel.create(activitiesList);
      console.log("CLEAN ACTIVITIES LIST =====> ", cleanActivitiesList);

   } catch (error) {
      console.log(error);
   }
}

sendAllSeeds();
