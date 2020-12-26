const express = require("express");
const router = express.Router();

const { taskDetailCreateValidator, taskDetailUpdateValidator } = require("../validator");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { taskDetailById } = require("../controllers/task-detail");
const {
    create,
    read,
    update,
    remove,
    list
} = require("../controllers/task-detail");

// routes
router.get("/task-detail/:taskDetailId", read);
router.post("/task-detail/create/:userId", taskDetailCreateValidator, requireSignin, isAuth, isAdmin, create);
router.put(
    "/task-detail/:taskDetailId/:userId",
    taskDetailUpdateValidator,
    requireSignin,
    isAuth,
    isAdmin,
    update
);
router.delete(
    "/task-detail/:taskDetailId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.get("/task-detail", list);

// params
router.param("taskDetailId", taskDetailById);
router.param("userId", userById);

module.exports = router;