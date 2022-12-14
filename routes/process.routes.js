const processRouter = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const { Company } = require("../models/Company.model");
const { Goal } = require("../models/Goal.model");
const { Process } = require("../models/Process.model");
const { COMPANY_ENUM, MEH } = require("../utils/company-enum-data");
const {
  YOU_SHALL_NOT_PASS_FOCKERS,
  ITS_ALIVE_ITS_ALIIIIIIVE,
} = require("../utils/status-codes");

processRouter.use(isLoggedIn);

async function createACompanyOrNah(companyOrNah) {
  if (!companyOrNah) {
    return undefined;
  }

  const { desireability, name } = companyOrNah;

  const companyExists = await Company.findOne({ name });

  if (companyExists) {
    return companyExists._id;
  }

  const newDesireability = COMPANY_ENUM.includes(desireability)
    ? desireability
    : MEH;

  const createdCompany = await Company.create({
    ...companyOrNah,
    desireability: newDesireability,
  });

  return createdCompany._id;

  // return Company.create(companyOrNah).then(
  //   (createdCompany) => createdCompany._id
  // );
}

processRouter.post("/new", (req, res) => {
  const { name, url, notes, salary, isRemote, location, goalSlug, company } =
    req.body;

  //   ideally we validate taht everything is at least having a value

  Goal.findOne({ owner: req.user._id, slug: goalSlug }).then(
    async (possibleGoal) => {
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
        company: await createACompanyOrNah(company),
      }).then((createdProcess) => {
        res.status(ITS_ALIVE_ITS_ALIIIIIIVE).json(createdProcess);
      });
    }
  );
});

module.exports = processRouter;
