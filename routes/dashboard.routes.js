const { Router } = require("express");
const { addMonths } = require("date-fns");
const slugify = require("slugify");

const dashboardRouter = Router();

const FAKE_GOALS = [
  {
    title: "Get a job",
    description:
      "Make money. I payed for the bootcamp and now my finances are in need of some love",
    deadline: addMonths(new Date(), 2),
    slug: slugify("Get a job", { lower: true }),
  },
  {
    title: "Save money",
    description:
      "Save money. I payed for the bootcamp and now my finances are in need of some love",
    deadline: new Date("2023-07-01"),
    slug: slugify("Save money", {
      lower: true,
    }),
  },
];

dashboardRouter.get("/", (req, res) => {
  res.json({
    goals: FAKE_GOALS,
  });
});

module.exports = dashboardRouter;
