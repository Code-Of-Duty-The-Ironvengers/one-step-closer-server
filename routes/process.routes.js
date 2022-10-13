const processRouter = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const { Goal } = require("../models/Goal.model");
const { Process } = require("../models/Process.model");
const {
  YOU_SHALL_NOT_PASS_FOCKERS,
  ITS_ALIVE_ITS_ALIIIIIIVE,
} = require("../utils/status-codes");

processRouter.use(isLoggedIn);

processRouter.post("/new", (req, res) => {
  const { name, url, notes, salary, isRemote, location, goalSlug } = req.body;

  //   ideally we validate taht everything is at least having a value

  Goal.findOne({ owner: req.user._id, slug: goalSlug }).then((possibleGoal) => {
    if (!possibleGoal) {
      return res.status(YOU_SHALL_NOT_PASS_FOCKERS).json({
        errorMessage: "[Insert Nelson Laugh Here] - Ah ah ah ah ah ah",
      });
    }

    Process.create({
      name,
      url,
      notes,
      salary,
      location,
      isRemote,
      goal: possibleGoal._id,
    }).then((createdProcess) => {
      res.status(ITS_ALIVE_ITS_ALIIIIIIVE).json(createdProcess);
    });
  });
});

module.exports = processRouter;
