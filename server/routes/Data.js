const express = require("express");
const DataRoutes = express.Router();
const Data = require("../models/data");

const axios = require('axios');
const bcrypt = require("bcryptjs");

const API = "https://covidtracking.com/api/v1"
//states/20200331.json
const states = [
	{ name: "AL", value: "Alabama" },
	{ name: "AK", value: "Alaska" },
	{ name: "AS", value: "American Samoa" },
	{ name: "AZ", value: "Arizona" },
	{ name: "AR", value: "Arkansas" },
	{ name: "CA", value: "California" },
	{ name: "CO", value: "Colorado" },
	{ name: "CT", value: "Connecticut" },
	{ name: "DE", value: "Delaware" },
	{ name: "DC", value: "District Of Columbia" },
	{ name: "FM", value: "Federated States Of Micronesia" },
	{ name: "FL", value: "Florida" },
	{ name: "GA", value: "Georgia" },
	{ name: "GU", value: "Guam" },
	{ name: "HI", value: "Hawaii" },
	{ name: "ID", value: "Idaho" },
	{ name: "IL", value: "Illinois" },
	{ name: "IN", value: "Indiana" },
	{ name: "IA", value: "Iowa" },
	{ name: "KS", value: "Kansas" },
	{ name: "KY", value: "Kentucky" },
	{ name: "LA", value: "Louisiana" },
	{ name: "ME", value: "Maine" },
	{ name: "MH", value: "Marshall Islands" },
	{ name: "MD", value: "Maryland" },
	{ name: "MA", value: "Massachusetts" },
	{ name: "MI", value: "Michigan" },
	{ name: "MN", value: "Minnesota" },
	{ name: "MS", value: "Mississippi" },
	{ name: "MO", value: "Missouri" },
	{ name: "MT", value: "Montana" },
	{ name: "NE", value: "Nebraska" },
	{ name: "NV", value: "Nevada" },
	{ name: "NH", value: "New Hampshire" },
	{ name: "NJ", value: "New Jersey" },
	{ name: "NM", value: "New Mexico" },
	{ name: "NY", value: "New York" },
	{ name: "NC", value: "North Carolina" },
	{ name: "ND", value: "North Dakota" },
	{ name: "MP", value: "Northern Mariana Islands" },
	{ name: "OH", value: "Ohio" },
	{ name: "OK", value: "Oklahoma" },
	{ name: "OR", value: "Oregon" },
	{ name: "PW", value: "Palau" },
	{ name: "PA", value: "Pennsylvania" },
	{ name: "PR", value: "Puerto Rico" },
	{ name: "RI", value: "Rhode Island" },
	{ name: "SC", value: "South Carolina" },
	{ name: "SD", value: "South Dakota" },
	{ name: "TN", value: "Tennessee" },
	{ name: "TX", value: "Texas" },
	{ name: "UT", value: "Utah" },
	{ name: "VT", value: "Vermont" },
	{ name: "VI", value: "Virgin Islands" },
	{ name: "VA", value: "Virginia" },
	{ name: "WA", value: "Washington" },
	{ name: "WV", value: "West Virginia" },
	{ name: "WI", value: "Wisconsin" },
	{ name: "WY", value: "Wyoming" }
]
const STATES = [
	"AL",
	"AK",
	"AS",
	"AZ",
	"AR",
	"CA",
	"CO",
	"CT",
	"DE",
	"DC",
	"FL",
	"GA",
	"GU",
	"HI",
	"ID",
	"IL",
	"IN",
	"IA",
	"KS",
	"KY",
	"LA",
	"ME",
	"MD",
	"MA",
	"MI",
	"MN",
	"MS",
	"MO",
	"MT",
	"NE",
	"NV",
	"NH",
	"NJ",
	"NM",
	"NY",
	"NC",
	"ND",
	"MP",
	"OH",
	"OK",
	"OR",
	"PA",
	"PR",
	"RI",
	"SC",
	"SD",
	"TN",
	"TX",
	"UT",
	"VT",
	"VI",
	"VA",
	"WA",
	"WV",
	"WI",
	"WY",
]

DataRoutes.get("/updatedb/:date", async (req, res, next) => {
	try {
		let { data } = await axios.get(API + "/states/" + req.params.date + ".json");
		let toUpdate = []
		STATES.forEach(async (eachState) => {
			let id = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
			let dataInstance = {
				"id": id,
				"date": req.params.date,
				"country": "USA",
				"state": eachState,
				"death": 0,
				"recovered": 0,
				"positive": 0,
				"negative": 0,
				"totalTests": 0,
				"positiveIncrease": 0,
				"negativeIncrease": 0,
				"totalTestsIncrease": 0,
				"hospitalizedCurrently": 0,
				"hospitalizedIncrease": 0,
				"shelterInPlace": false
			}

			data.forEach(element => {
				if (element["state"] == eachState) {
					dataInstance["id"] = element["hash"];
					if (element["death"]) {
						dataInstance["death"] = element["death"];
					}
					if (element["recovered"]) {
						dataInstance["recovered"] = element["recovered"];
					}
					if (element["positive"]) {
						dataInstance["positive"] = element["positive"];
					}
					if (element["negative"]) {
						dataInstance["negative"] = element["negative"];
					}
					if (element["totalTestResults"]) {
						dataInstance["totalTests"] = element["totalTestResults"];
					}
					if (element["positiveIncrease"]) {
						dataInstance["positiveIncrease"] = element["positiveIncrease"];
					}
					if (element["negativeIncrease"]) {
						dataInstance["negativeIncrease"] = element["negativeIncrease"];
					}
					if (element["totalTestResultsIncrease"]) {
						dataInstance["totalTestsIncrease"] = element["totalTestResultsIncrease"];
					}
					if (element["hospitalized"]) {
						dataInstance["hospitalizedCurrently"] = element["hospitalized"];
					}
					if (element["hospitalizedIncrease"]) {
						dataInstance["hospitalizedIncrease"] = element["hospitalizedIncrease"];
					}
					switch (eachState) {
						case "AL":
							if (Number(req.params.date) > 20200404) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 4903185;
							break;
						case "AK":
							if (Number(req.params.date) > 20200328) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 731545;
							break;
						case "AS":
							dataInstance["population"] = 55641;
							break;
						case "AZ":
							if (Number(req.params.date) > 20200331) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 7278717;
							break;
						case "AR":
							dataInstance["population"] = 3017825;
							break;
						case "CA":
							if (Number(req.params.date) > 20200319) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 39512223;
							break;
						case "CO":
							if (Number(req.params.date) > 20200326) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 5758736;
							break;
						case "CT":
							if (Number(req.params.date) > 20200323) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 3565287;
							break;
						case "DE":
							if (Number(req.params.date) > 20200324) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 973764;
							break;
						case "DC":
							if (Number(req.params.date) > 20200401) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 705749;
							break;
						case "FL":
							if (Number(req.params.date) > 20200403) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 21477737;
							break;
						case "GA":
							if (Number(req.params.date) > 20200403) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 10617423;
							break;
						case "GU":
							dataInstance["population"] = 165718;
							break;
						case "HI":
							if (Number(req.params.date) > 20200325) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 1415872;
							break;
						case "ID":
							if (Number(req.params.date) > 20200325) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 1787065;
							break;
						case "IL":
							if (Number(req.params.date) > 20200321) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 12671821;
							break;
						case "IN":
							if (Number(req.params.date) > 20200324) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 6732219;
							break;
						case "IA":
							dataInstance["population"] = 3155070;
							break;
						case "KS":
							if (Number(req.params.date) > 20200320) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 2913314;
							break;
						case "KY":
							if (Number(req.params.date) > 20200326) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 4467673;
							break;
						case "LA":
							if (Number(req.params.date) > 20200323) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 4648794;
							break;
						case "ME":
							if (Number(req.params.date) > 20200402) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 1344212;
							break;
						case "MD":
							if (Number(req.params.date) > 20200330) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 6045680;
							break;
						case "MA":
							if (Number(req.params.date) > 20200324) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 6949503;
							break;
						case "MI":
							if (Number(req.params.date) > 20200324) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 9986857;
							break;
						case "MN":
							if (Number(req.params.date) > 20200327) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 5639632;
							break;
						case "MS":
							if (Number(req.params.date) > 20200403) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 2976149;
							break;
						case "MO":
							if (Number(req.params.date) > 20200406) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 6137482;
							break;
						case "MT":
							if (Number(req.params.date) > 20200328) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 1068778;
							break;
						case "NE":
							dataInstance["population"] = 1934408;
							break;
						case "NV":
							if (Number(req.params.date) > 20200401) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 3080156;
							break;
						case "NH":
							if (Number(req.params.date) > 20200327) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 1359711;
							break;
						case "NJ":
							if (Number(req.params.date) > 20200321) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 8882190;
							break;
						case "NM":
							if (Number(req.params.date) > 20200324) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 2096829;
							break;
						case "NY":
							if (Number(req.params.date) > 20200322) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 19453561;
							break;
						case "NC":
							if (Number(req.params.date) > 20200330) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 10488084;
							break;
						case "ND":
							dataInstance["population"] = 762062;
							break;
						case "OH":
							if (Number(req.params.date) > 20200323) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 11689100;
							break;
						case "OK":
							if (Number(req.params.date) > 20200328) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 3956971;
							break;
						case "OR":
							if (Number(req.params.date) > 20200323) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 4217737;
							break;
						case "PA":
							if (Number(req.params.date) > 20200401) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 12801989;
							break;
						case "PR":
							if (Number(req.params.date) > 20200315) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 3193694;
							break;
						case "RI":
							if (Number(req.params.date) > 20200328) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 1059361;
							break;
						case "SC":
							if (Number(req.params.date) > 20200407) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 5148714;
							break;
						case "SD":
							dataInstance["population"] = 884659;
							break;
						case "TN":
							if (Number(req.params.date) > 20200331) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 6833174;
							break;
						case "TX":
							if (Number(req.params.date) > 20200402) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 28995881;
							break;
						case "UT":
							if (Number(req.params.date) > 20200401) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 3205958;
							break;
						case "VT":
							if (Number(req.params.date) > 20200325) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 623989;
							break;
						case "VI":
							if (Number(req.params.date) > 20200330) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 106977;
							break;
						case "VA":
							if (Number(req.params.date) > 20200330) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 8535519;
							break;
						case "WA":
							if (Number(req.params.date) > 20200323) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 7614893;
							break;
						case "WV":
							if (Number(req.params.date) > 20200325) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 1792147;
							break;
						case "WI":
							if (Number(req.params.date) > 20200325) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 5822434;
							break;
						case "WY":
							if (Number(req.params.date) > 20200328) {
								dataInstance["shelterInPlace"] = true;
							}
							dataInstance["population"] = 578759;
							break;
					}
				}
			});
			// a document instance
			var doc = new Data(dataInstance);

			// save model to database
			doc.save(function (err, book) {
				if (err) return console.error(err);
				console.log(doc.date + " State: " + doc.state + " saved to collection.");
			});

			toUpdate.push(doc);

		})
		res.status(200).send(toUpdate);

	} catch (error) {
		next(error);
	}
});

DataRoutes.get("/allStates", async (req, res, next) => {
	try {
		res.status(200).send(states);
	}
	catch (error) {
		next(error);
	}
});

module.exports = DataRoutes;
