const express = require("express");
const { User } = require("../models/User.model");
const { BS_REQUEST } = require("../utils/status-codes");

const router = express.Router();

router.post("/edit", (req, res) => {
  const { username, name, email } = req.body;

  if (!username) {
    return res
      .status(BS_REQUEST)
      .json({ message: "please provide your username 🤌" });
  }

  if (!name) {
    return res
      .status(BS_REQUEST)
      .json({ message: "please provide your name 🤌" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailRegex.test(email)) {
    res
      .status(BS_REQUEST)
      .json({ message: "Provide a valid email address.🤌 " });
    return;
  }

  User.findOne({ $or: [{ username, email }] }).then((user) => {
    if (user) {
      return res.status(BS_REQUEST).json({ message: "🤌🤌🤌🤌🤌🤌" });
    }
  });
});
