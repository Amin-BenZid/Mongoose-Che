const mongoose = require("mongoose");
const run = require("nodemon/lib/monitor/run");
const server = "localhost:27017";
const database = "mongooseChe";
const URL = `mongodb://${server}/${database}`;
const User = require("./user");

// Installing and setting up Mongoose:

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected !");
  })
  .catch((err) => console.error("err"));

// Create Many Records with model.create()
// Create and Save a Record of a Model:

// run();
// async function run() {
//   try {
//     const user = await User.create({});
//     console.log(user);
//   } catch (err) {
//     console.log(err.message);
//   }
// }

// Use model.find() to Search Your Database

User.find(null, (err, data) => {
  if (err) console.error("err");
  else console.log(data);
});

// Use model.findOne() to Return a Single Matching Document from Your Database

User.findOne({ favoriteFoods: "pizza" }, (err, data) => {
  if (err) console.error(err.message);
  else console.log(data);
});

// Use model.findById() to Search Your Database By _id

User.findById("61e853b516a9716d6397adbd", (err, data) => {
  if (err) console.error(err.message);
  else console.log(data);
});

// Perform Classic Updates by Running Find, Edit, then Save

User.findById("61e853b516a9716d6397adbd", (err, data) => {
  if (err) console.error(err.message);
  // data.favoriteFoods.push("hamburger");
  data.save((err, res) => {
    if (err) console.error(err.message);
    else console.log(res);
  });
});

// Perform New Updates on a Document Using model.findOneAndUpdate()

let filter = { name: "Tom" };
let update = { age: 60 };

User.findOneAndUpdate(filter, update, (err, data) => {
  if (err) console.error(err.message);
  else console.log(data);
});

//Delete One Document Using model.findByIdAndRemove

let userId = "61e8536963d247e1f4abeeb5";

User.findByIdAndRemove(userId, (err, data) => {
  if (err) console.error(err.message);
  else console.log(data);

  //RIP BOB :((( YOU WILL BE MISSED </3
});

//MongoDB and Mongoose - Delete Many Documents with model.remove()

const removeMarry = (done) => {
  User.remove({ name: "Mary" }, (err, data) => {
    if (err) console.error(err.message);
    done(null, data);
  });
};

//Chain Search Query Helpers to Narrow Search Results

const chain = (done) => {
  User.find({ favoriteFoods: "burritos" })
    .sort({ name: "asc" })
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => {
      done(err, data);
    });
};
