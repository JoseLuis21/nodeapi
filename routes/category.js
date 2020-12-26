const express = require("express");
const router = express.Router();

const { categoryFormValidator } = require("../validator");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const {
    create,
    categoryById,
    read,
    update,
    remove,
    list
} = require("../controllers/category");

// routes
router.get("/category/:categoryId", read);
router.post("/category/create/:userId", categoryFormValidator, requireSignin, isAuth, isAdmin, create);
router.put(
    "/category/:categoryId/:userId",
    categoryFormValidator,
    requireSignin,
    isAuth,
    isAdmin,
    update
);
router.delete(
    "/category/:categoryId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.get("/categories", list);

// params
router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router;