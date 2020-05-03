import React from "react";
import axios from "axios";
import USAMap from "react-usa-map";
import "../media/css/usmap.css";
import {Row, Col} from "antd";

class USMAP extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
            config: {},
            selected: {
                "id": "united-states-of-america-michigan",
                "name": "Michigan",
                "typeId": "region",
                "location": {
                    "type": "Point",
                    "coordinates": [
                        -86.2402665,
                        46.131351
                    ]
                },
                "alpha2code": "MI",
                "dataSource": "https://github.com/CSSEGISandData/COVID-19",
                "latestData": {
                    "date": "2020-04-14",
                    "cases": 32393,
                    "deaths": 1997,
                    "recovered": 760
                }
            }
		};
	}
	componentDidMount() {
		this.getData();
	}
	getData = async () => {
		try {
			let res = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/chart/usamap`
			);
			let chartData = res.data.data[0].children;
			let min = 100000000000;
			let max = 0;
			chartData.forEach((d) => {
				max = Math.max(max, d.latestData.cases);
				min = Math.min(min, d.latestData.cases);
			});
            // let level = (max - min) / 16;
            let level = 1600;
            // console.log('level',level);
			let config = {};
			chartData.forEach((d) => {
				let cases = d.latestData.cases;
				let color = "#ffffff";
				if (cases < min + level) {
                    color = "#cccccc";
				} else if (cases < min + level * 2) {
					color = "#ffeeee";
				} else if (cases < min + level * 3) {
					color = "#ffdddd";
				} else if (cases < min + level * 4) {
					color = "#ffcccc";
				} else if (cases < min + level * 5) {
					color = "#ffbbbb";
				} else if (cases < min + level * 6) {
					color = "#ffaaaa";
				} else if (cases < min + level * 7) {
					color = "#ff9999";
				} else if (cases < min + level * 8) {
					color = "#ff8888";
				} else if (cases < min + level * 9) {
					color = "#ff7777";
				} else if (cases < min + level * 10) {
					color = "#ff6666";
				} else if (cases < min + level * 11) {
					color = "#ff5555";
				} else if (cases < min + level * 12) {
					color = "#ff4444";
				} else if (cases < min + level * 13) {
					color = "#ff3333";
				} else if (cases < min + level * 14) {
					color = "#ff2222";
				} else if (cases < min + level * 15) {
					color = "#ff1111";
				} else {
					color = "#ff0000";
                }
				config[d.alpha2code] = {
					fill: color,
					clickHandler: () => this.select(d),
				};
            });
            // console.log('chartData[0]',chartData[0]);
			this.setState({
				data: chartData,
				config: config,
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
            selected: d
        })
    }
	mapHandler = (event) => {
		// console.log('event',event);
		// alert(event.target.dataset);
	};
	selectColor = (num) => {
		if (num > 1000) {
			return "#ff0000";
		} else {
			return "#550000";
		}
	};
	render() {
		const { config, selected } = this.state;
		return (
			<div className="common-root">
                <Row type="flex" justify="center">
                    <h1>Total Cases</h1>
                </Row>
                <Row>
                    <Col span={16}>
                        <USAMap customize={config}/>
                    </Col>
                    <Col span={8}>
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
                                {"Short Name: "}
                            </span>
                            <span className="usmap-details-values">
                                {selected.alpha2code}
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
                                {"Source: "}
                            </span>
                            <span className="usmap-details-values">
                                {selected.dataSource}
                            </span>
                        </p>
                        <p>
                            <span className="usmap-details-keys">
                                {"Latest Updated: "}
                            </span>
                            <span className="usmap-details-values">
                                {selected.latestData.date}
                            </span>
                        </p>
                        <p>
                            <span className="usmap-details-keys">
                                {"Total Cases: "}
                            </span>
                            <span className="usmap-details-keys">
                                {selected.latestData.cases}
                            </span>
                        </p>
                        <p>
                            <span className="usmap-details-keys">
                                {"Total deaths: "}
                            </span>
                            <span className="usmap-details-values">
                                {selected.latestData.deaths}
                            </span>
                        </p>
                        <p>
                            <span className="usmap-details-keys">
                                {"Total recovered: "}
                            </span>
                            <span className="usmap-details-values">
                                {selected.latestData.recovered}
                            </span>
                        </p>
                    </Col>
                </Row>
			</div>
		);
	}
}

export default USMAP;
