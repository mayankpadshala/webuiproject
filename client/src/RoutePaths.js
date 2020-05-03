import { ProtectedRoute } from "./ProtectedRoute";
import { Route } from "react-router-dom";
import React, { Component } from "react";
import Login from "./authentication/Login";
import Signup from "./authentication/SignUp";
import Home from "./home/Home";

class RoutePaths extends Component {
	render() {
		return (
			<div>
{/* =========================================== USER ============================================== */}
				{/* <Route path="/home" component={Home} /> */}
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={Signup} />
				{/* <Route exact path="/" component={Home} /> */}
{/* =========================================== HOME ============================================== */}
				<ProtectedRoute exact path="/" component={Home} />
				<ProtectedRoute path="/home" component={Home} />
			</div>
		);
	}
}
export default RoutePaths;
