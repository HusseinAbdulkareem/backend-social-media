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

// get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...otherDetails } = user._doc;
    res.status(200).json(otherDetails);
  } catch (err) {
    res.status(500).json(err);
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
