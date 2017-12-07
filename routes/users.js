"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.get("/", function (req, res, next) {
    res.send("users is listening...");
});
exports.default = router;
