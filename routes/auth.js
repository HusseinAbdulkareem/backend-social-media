const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
  try {
    // Generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create New User
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      //   password: req.body.password,
    });

    // Save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found");
    }
    // Check password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!validPassword) {
      return res.status(400).json("Wrong password");
    }

    // Hide password from response
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
