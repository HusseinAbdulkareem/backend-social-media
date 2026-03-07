const mongoose = require("mongoose");
const { type } = require("os");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 10,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      max: 25,
    },

    password: {
      type: String,
      min: 3,
      max: 25,
    },

    profilePicture: {
      type: String,
      default: "",
    },

    coverPicture: {
      type: String,
      default: "",
    },

    followers: {
      type: Array,
      default: [],
    },

    followings: {
      type: Array,
      default: [],
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    desc: {
      type: String,
      max: 50,
    },

    city: {
      type: String,
      max: 50,
    },

    from: {
      type: String,
      max: 50,
    },

    relationship: {
      type: String,
      enum: [1, 2, 3, 4],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", UserSchema);
