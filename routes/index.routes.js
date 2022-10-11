const dashboardRouter = require("./dashboard.routes");

const router = require("express").Router();
const authRoutes = require("./auth.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json({ hiClass: "how you doin?" });
});

router.use("/dashboard", dashboardRouter);
router.use("/auth", authRoutes);
router.use("/profile", require("./profile.routes"));

module.exports = router;
