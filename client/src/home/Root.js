import React from "react";
import CountriesMap from "../charts/CountriesMap";


class Root extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	componentDidMount() {
	}
	render() {
		return (
			<div className="common-root">
				{/* <h1>Root</h1> */}
				<CountriesMap />
			</div>
		);
	}
}
export default Root;
