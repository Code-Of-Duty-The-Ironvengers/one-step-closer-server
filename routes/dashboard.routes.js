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

dashboardRouter.get("/:slug", (req, res) => {
  const goal = FAKE_GOALS.find((goal) => goal.slug === req.params.slug);

  res.json({ goal });
});

module.exports = dashboardRouter;

// https://www.skyscanner.nl/transport/vluchten/ams/krk/221006/221013/?adults=1&adultsv2=1&cabinclass=economy&children=0&childrenv2=&destinationentityid=27543787&inboundaltsenabled=false&infants=0&originentityid=27536561&outboundaltsenabled=false&preferdirects=false&ref=home&rtn=1
// router.get('/vlucthen/:origin/:goal)
