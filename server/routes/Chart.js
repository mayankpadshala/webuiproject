const express = require("express");
const ChartRoutes = express.Router();
const Data = require("../models/data");
const axios = require("axios");

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
        let data = await Data.findById(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        next(error)
    }
})
// ====================== POST ========================================

ChartRoutes.get("/usamap", async (req, res, next) => {
    try {
        let data = await axios.get(
            `https://api.coronatab.app/places?typeId=country&include[]=children&name=United States of America`);
        res.status(200).send(data.data);
    } catch (error) {
        next(error)
    }
})
ChartRoutes.get("/countriesMap", async (req, res, next) => {
    try {
        let data = await axios.get(
            `https://api.coronatab.app/places?typeId=country`);
        res.status(200).send(data.data);
    } catch (error) {
        next(error)
    }
})

ChartRoutes.get("/:country/:state", async (req, res, next) => {
    try {
        let statesData = await Data.find({ "state": req.params.state });
        if (statesData === null) {
            next("No state found")
        }
        res.status(200).send(statesData);
    }
    catch (error) {
        next(error);
    }
});

// ====================== PUT ========================================

module.exports = ChartRoutes;