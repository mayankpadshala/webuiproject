const express = require("express");
const ChartRoutes = express.Router();
const Data = require("../models/data");

// ====================== GET ========================================
ChartRoutes.get("/all", async (req, res, next) => {
    try {
        let allData = await Data.find({}).limit(50);
        res.status(200).send(allData);
    } catch (error) {
        next(error)
    }
})
ChartRoutes.get("/id/:id", async (req, res, next) => {
    try {
        let data = await (await Data.findById(req.params.id));
        res.status(200).send(data);
    } catch (error) {
        next(error)
    }
})
// ====================== POST ========================================

// ====================== PUT ========================================

module.exports = ChartRoutes;