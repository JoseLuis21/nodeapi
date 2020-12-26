const express = require("express");
const router = express.Router();

const { taskCreateValidator } = require("../validator");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const {
    create,
    taskById,
    read,
    update,
    remove,
    list,
    listCategories,
    listSearch
} = require("../controllers/task");

// routes
router.get("/task/:taskId", read);
router.post("/task/create/:userId",  requireSignin, isAuth, isAdmin, taskCreateValidator, create);
router.put(
    "/task/:taskId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);
router.delete(
    "/task/:taskId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.get("/task", list);
router.get("/task/search", listSearch);
router.get("/task/categories", listCategories);

// params
router.param("taskId", taskById);
router.param("userId", userById);

module.exports = router;