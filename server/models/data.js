const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema({
    id: {
        type: String,
        required: [true, "Id is required!!!"],
        unique: true,
    },
    date: {
        type: Number,
        required: [true, "Date is required!!!"],
    },
    country: {
        type: String,
        required: [true, "Country is required!!!"],
    },
    state: {
        type: String,
    },
    death: {
        type: Number,
    },
    recovered: {
        type: Number,
    },
    positive: {
        type: Number,
    },
    negative: {
        type: Number,
    },
    totalTests: {
        type: Number,
    },
    positiveIncrease: {
        type: Number,
    },
    negativeIncrease: {
        type: Number,
    },
    totalTestsIncrease: {
        type: Number,
    },
    hospitalizedCurrently: {
        type: Number,
    },
    hospitalizedIncrease: {
        type: Number,
    },
    shelterInPlace: {
        type: Boolean,
    },
    population: {
        type: Number,
    },
});

const Data = mongoose.model("data", DataSchema);

module.exports = Data;