const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true, // -> Ideally, should be unique, but its up to you
      required: true,
      min: 3,
      max: 16,
    },
    name: {
      type: String,
      max: 50,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const userCollectionName = "User";
const User = model(userCollectionName, userSchema);

module.exports = { userCollectionName, User };
