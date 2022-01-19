const mongoose = require("mongoose");
// Create a person with this prototype:

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

module.exports = mongoose.model("User", userSchema);
