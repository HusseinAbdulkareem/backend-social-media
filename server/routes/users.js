const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = require("express").Router();

// update user
router.put("/:id", async (req, res) => {
  const userId = req.body.userId || req.query.userId;
  if (userId === req.params.id || req.user?.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSaltSync(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { returnDocument: "after" },
      );
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can update only your  account!");
  }
});

// delete user
router.delete("/:id", async (req, res) => {
  const userId =
    (req.body && req.body.userId) || (req.query && req.query.userId);
  const isAdmin =
    (req.body && req.body.isAdmin) || (req.user && req.user.isAdmin);
  if ((userId && userId === req.params.id) || isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can delete only your account!");
  }
});

// search users by username
router.get("/search", async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json("Search query is required");
  try {
    const users = await User.find({
      username: { $regex: q, $options: "i" },
    }).limit(10);
    const results = users.map(({ _id, username, profilePicture }) => ({
      _id,
      username,
      profilePicture,
    }));
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId || req.query.id;
  const username = req.query.username;

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    if (!user) return res.status(404).json("User not found");
    const { password, updatedAt, ...otherDetails } = user._doc;
    res.status(200).json(otherDetails);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => User.findById(friendId)),
    );

    let frinedList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      frinedList.push({
        _id,
        username,
        profilePicture,
      });
    });
    res.status(200).json(frinedList);
  } catch (err) {
    res.status(500).json({ error: "Not found friends", details: err });
  }
});

// follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("User has been followed");
      } else {
        res.status(403).json("You already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You cannot follow yourself");
  }
});

// unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("User has been unfollowed");
      } else {
        res.status(403).json("You do not follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You cannot unfollow yourself");
  }
});

module.exports = router;
