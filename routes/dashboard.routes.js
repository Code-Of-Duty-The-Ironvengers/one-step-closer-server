const { Router } = require("express");
const { addMonths, isValid } = require("date-fns");
const slugify = require("slugify");
const isLoggedIn = require("../middleware/isLoggedIn");
const { Goal } = require("../models/Goal.model");
const {
  BS_REQUEST,
  YOU_SHALL_NOT_PASS_FOCKERS,
} = require("../utils/status-codes");

const dashboardRouter = Router();

dashboardRouter.get("/", isLoggedIn, (req, res) => {
  // Every single goal, by the user
  Goal.find({ owner: req.user._id }).then((allGoals) => {
    res.json(allGoals);
  });
});

dashboardRouter.get("/:slug", isLoggedIn, (req, res) => {
  const { slug } = req.params;
  const { _id } = req.user;
  // Find One Goal, that has this slug: slug, and the owner has this value: _id
  // Find One By That the req.user._id is the value for owner
  Goal.findOne({ slug, owner: _id }).then((possibleGoal) => {
    console.log("possibleGoal:", possibleGoal);
    if (!possibleGoal) {
      return res
        .status(YOU_SHALL_NOT_PASS_FOCKERS)
        .json({ errorMessage: "Syntax Error" });
    }

    res.json(possibleGoal);
  });
});

dashboardRouter.post("/create-goal", isLoggedIn, (req, res) => {
  const { title = "", description, deadline: deadlineString } = req.body;

  if (typeof title !== "string") {
    return res.status(BS_REQUEST).json({ errorMessage: "Brock you fockers" });
  }

  if (title.length < 3 || title.length > 20) {
    return res.status(BS_REQUEST).json({ errorMessage: "Brock you fockers" });
  }

  const deadline = new Date(deadlineString);

  const validDeadline = isValid(deadline);

  if (!validDeadline) {
    return res.status(BS_REQUEST).json({ errorMessage: "Brock you fockers" });
  }

  const slug = slugify(title);

  // VALIDATE THAT USER DOES NOT HAVE ANY GOAL WITH THIS TITLE
  Goal.findOne({ owner: req.user._id, slug }).then((possibleGoal) => {
    if (possibleGoal) {
      return res
        .status(BS_REQUEST)
        .json({ errorMessage: "Brok you, but try again", code: 1, slug });
    }

    Goal.create({
      title,
      description,
      deadline,
      owner: req.user._id,
      slug,
    }).then((createdGoal) => {
      res.json(createdGoal);
    });
  });
});

module.exports = dashboardRouter;

// https://www.skyscanner.nl/transport/vluchten/ams/krk/221006/221013/?adults=1&adultsv2=1&cabinclass=economy&children=0&childrenv2=&destinationentityid=27543787&inboundaltsenabled=false&infants=0&originentityid=27536561&outboundaltsenabled=false&preferdirects=false&ref=home&rtn=1
// router.get('/vlucthen/:origin/:goal)
