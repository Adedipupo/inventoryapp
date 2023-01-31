import { UserModel } from "../models/userModel.js";
import schedule from "node-schedule";


const j = schedule.scheduleJob("0 0 12 * * *", function() {

    console.log("Running Cron Job");
    // const users = UserModel.find();
    // console.log("users: " + users);
    // // Get the list of users from the MongoDB database
    // usersCollection.find({}).toArray((err, users) => {
    //   // Loop through the users and send them an email
    //   users.forEach(user => {
    //     sendEmail(user.email, "Daily Update", "Here is your daily update");
    //   });
    // });
  });

