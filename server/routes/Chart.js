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

ChartRoutes.get("/:country/:state/population", async (req, res, next) => {
    try {
        let statesData = await Data.find({ "state": req.params.state }).sort({ 'date': -1 }).limit(1);
        if (statesData === null) {
            next("No state found")
        }
        res.status(200).send(statesData);
    }
    catch (error) {
        next(error);
    }
});


const sort_by = (field, reverse, primer) => {

    const key = primer ?
        function (x) {
            return primer(x[field])
        } :
        function (x) {
            return x[field]
        };

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
}


ChartRoutes.get("/:country/:state/limit/:lmt", async (req, res, next) => {
    try {
        let statesData = await Data.find({ "state": req.params.state }).sort({ 'date': -1 }).limit(parseInt(req.params.lmt));
        if (statesData === null) {
            next("No state found")
        }
        console.log(statesData.sort(sort_by('date', true, parseInt)));
        res.status(200).send(statesData.sort(sort_by('date', false, parseInt)));
    }
    catch (error) {
        next(error);
    }
});
// ====================== PUT ========================================

module.exports = ChartRoutes;