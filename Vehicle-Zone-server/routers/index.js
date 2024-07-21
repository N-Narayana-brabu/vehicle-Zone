const express = require("express");
const loginRouter = require("./loginRouter.js");
const datatypeRouter = require("./datatypeRouter.js");
const pagesRouter = require("./pagesRouter.js");
const userRouter = require("./usersRouter.js");
const appdataRouter = require("./appdataRouter.js");
const channelpartnerRouter = require("./vechiletypeRoutes.js");
const dashboardRouter = require("./appDashboardsRouter.js");


const router = express.Router();

router.use("/login", loginRouter);
router.use("/pages", pagesRouter);
router.use("/datatype", datatypeRouter);
router.use("/users", userRouter);
router.use("/appdata", appdataRouter);
router.use("/vechiletype", channelpartnerRouter);
router.use("/dashboards", dashboardRouter);


module.exports = router;
