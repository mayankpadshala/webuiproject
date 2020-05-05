import React from "react";
import axios from "axios";
import "../media/css/countriesMap.css";
import { Row, Col, Button } from "antd";
import { VectorMap } from "react-jvectormap";

class CountriesMap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rawData: [],
			data: [],
			displayData: {},
			selected: {
				id: "united-states-of-america",
				typeId: "country",
				alpha2code: "US",
				alpha3code: "USA",
				hospitalBedOccupancy: 0.64,
				hospitalBeds: 916877,
				icuBeds: 114858,
				dataSource:
					"https://health.wyo.gov/publichealth/infectious-disease-epidemiology-unit/disease/novel-coronavirus/",
				location: {
					type: "Point",
					coordinates: [-107.554, 43.0005],
				},
				population: 331002651,
				parentId: "earth",
				latestData: {
					date: "2020-04-21",
					cases: 776215,
					deaths: 37570,
					recovered: 30274,
				},
				name: "United States of America",
			},
			scale:["#146804", "#ff0000"],
			title: "Total Cases"
		};
	}
	componentDidMount() {
		this.getData();
	}
	getData = async () => {
		try {
			let res = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/chart/countriesMap`
			);
			let chartData = res.data.data;
			console.log("chartData", chartData);
			console.log("chartData", chartData.length);
			let mapData = {};
			let displayData = {};
			for (let i = 0; i < chartData.length; i++) {
				let d = chartData[i];
				mapData[d.alpha2code] = d.latestData.cases;
				displayData[d.alpha2code] = d;
			}
			this.setState({
				rawData:res.data.data,
				data: mapData,
				displayData: displayData,
				selected: chartData[0],
			});
		} catch (error) {
			if (error.response) {
				console.log("response error", error.response.data);
			} else {
				console.log("error", error);
			}
		}
	};
	select = (d) => {
		this.setState({
			selected: d,
		});
    };
    setCases = () => {
		let mapData = {};
		for (let i = 0; i < this.state.rawData.length; i++) {
			let d = this.state.rawData[i];
			mapData[d.alpha2code] = d.latestData.cases;
			// displayData[d.alpha2code] = d;
		}
		this.setState({
			data: mapData,
			scale: ["#146804", "#ff0000"],
			title: "Total Cases"
		})
    }
    setDeaths = () => {
        let mapData = {};
		for (let i = 0; i < this.state.rawData.length; i++) {
			let d = this.state.rawData[i];
			mapData[d.alpha2code] = d.latestData.deaths;
			// displayData[d.alpha2code] = d;
		}
		this.setState({
			data: mapData,
			scale: ["#146804", "#ff0000"],
			title: "Total Deaths"
		})
    }
    setRecovery = () => {
        let mapData = {};
		for (let i = 0; i < this.state.rawData.length; i++) {
			let d = this.state.rawData[i];
			mapData[d.alpha2code] = d.latestData.recovered;
			// displayData[d.alpha2code] = d;
		}
		this.setState({
			data: mapData,
			scale: ["#ff0000", "#146804"],
			title: "Total Recovered"
		})
    }
	handleClick = (e, countryCode) => {
		// console.log(countryCode);
		this.setState({
			selected: this.state.displayData[countryCode],
		});
	};
	render() {
		const { data, selected, scale, title } = this.state;
		// console.log('data',data);
		return (
			<div className="common-root">
				<Row type="flex" justify="center">
					<h1>{title}</h1>
				</Row>
                <Row type="flex" justify="center">
					<Button
						onClick={this.setCases}
						type="primary"
						ghost
					>
                        Cases
                    </Button>
                    <Button 
						onClick={this.setDeaths}
						type="primary"
						ghost
					>
                        Deaths
                    </Button>
                    <Button
						onClick={this.setRecovery}
						type="primary"
						ghost
					>
                        Recovery
                    </Button>
				</Row>
				<Row>
					<Col span={16}>
						<VectorMap
							// className="countriesMap-mapsize"
							map={"world_mill"}
							backgroundColor="transparent"
							// backgroundColor="#0077be"
							zoomOnScroll={false}
							containerStyle={{
								width: "100%",
								height: "520px",
							}}
							onRegionClick={this.handleClick} //gets the country code
							containerClassName="map countriesMap-mapsize"
							regionStyle={{
								initial: {
									fill: "#e4e4e4",
									"fill-opacity": 0.9,
									stroke: "none",
									"stroke-width": 0,
									"stroke-opacity": 0,
								},
								hover: {
									"fill-opacity": 0.8,
									cursor: "pointer",
								},
							}}
							series={{
								regions: [
									{
										values: data, //this is your data
										scale: scale, //your color game's here
										normalizeFunction: "polynomial",
									},
								],
							}}
						/>
					</Col>
					<Col span={8}>

						<p>
							<span className="usmap-details-keys">
								{"Latest update: "}
							</span>
							<span className="usmap-details-values">
								{selected.latestData.date}
							</span>
						</p>
						<p>
							<span className="usmap-details-keys">
								{"Name: "}
							</span>
							<span className="usmap-details-values">
								{selected.name}
							</span>
						</p>

						<p>
							<span className="usmap-details-keys">
								{"Population: "}
							</span>
							<span className="usmap-details-values">
								{selected.population}
							</span>
						</p>
						<p>
							<span className="usmap-details-keys">
								{"Cases: "}
							</span>
							<span className="usmap-details-values">
								{selected.latestData.cases}
							</span>
						</p>
						<p>
							<span className="usmap-details-keys">
								{"Deaths: "}
							</span>
							<span className="usmap-details-values">
								{selected.latestData.deaths}
							</span>
						</p>
						<p>
							<span className="usmap-details-keys">
								{"Recovered: "}
							</span>
							<span className="usmap-details-values">
								{selected.latestData.recovered}
							</span>
						</p>
						<p>
							<span className="usmap-details-keys">
								{"Short Name: "}
							</span>
							<span className="usmap-details-values">
								{selected.alpha3code}
							</span>
						</p>
						<p>
							<span className="usmap-details-keys">
								{"Hospital Bed Occupancy: "}
							</span>
							<span className="usmap-details-values">
								{(selected.hospitalBedOccupancy * 100)+"%"}
							</span>
						</p>
						<p>
							<span className="usmap-details-keys">
								{"Hospital Beds: "}
							</span>
							<span className="usmap-details-values">
								{selected.hospitalBeds}
							</span>
						</p>
						<p>
							<span className="usmap-details-keys">
								{"ICU Beds: "}
							</span>
							<span className="usmap-details-values">
								{selected.icuBeds}
							</span>
						</p>
						<p>
							<span className="usmap-details-keys">
								{"Latitude: "}
							</span>
							<span className="usmap-details-values">
								{selected.location.coordinates[0]}
							</span>
						</p>
						<p>
							<span className="usmap-details-keys">
								{"Longitude: "}
							</span>
							<span className="usmap-details-values">
								{selected.location.coordinates[1]}
							</span>
						</p>
						<p>
							<span className="usmap-details-keys">
								{"dataSource: "}
							</span>
							<span className="usmap-details-values">
								{selected.dataSource}
							</span>
						</p>
					</Col>
				</Row>
			</div>
		);
	}
}

export default CountriesMap;
