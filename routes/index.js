"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.get("/", function (req, res, next) {
    res.render("index");
});
const users_1 = require("./users");
router.use("/users", users_1.default);
exports.default = router;
