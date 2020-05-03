import React from "react";
import USMAP from "../charts/USMAP";

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}
	render() {
		return (
			<div className="common-root">
				<h1>Dashboard</h1>
				<USMAP />
			</div>
		);
	}
}
export default Dashboard;
