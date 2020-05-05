import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Route, Switch } from "react-router-dom";
import "../media/css/home.css";
import Root from "./Root";
import Dashboard from "./Dashboard";
import UserStatus from "../UserStatus";
import States from "../charts/States";
import Hom from "../charts/Hom";
const { Header, Content, Footer } = Layout;

class Home extends React.Component {
	handleLogout = () => {
		UserStatus.logOut();
		this.props.history.push("/login");
	};
	componentDidMount() {
	}
	render() {
		return (
			<Layout>
				<Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
					<div className="logo" />
					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={["1"]}
						style={{ lineHeight: "64px" }}
					>
						<Menu.Item key="1" onClick={() => this.props.history.push("/home/")} >Home</Menu.Item>
						<Menu.Item key="2" onClick={() => this.props.history.push("/home/world")} >World</Menu.Item>
						<Menu.Item key="3" onClick={() => this.props.history.push("/home/USA")} >USA</Menu.Item>
						<Menu.Item key="4" onClick={() => this.props.history.push("/home/states")} >States</Menu.Item>
						<Menu.Item
							key="5"
							className="logout-btn"
							onClick={this.handleLogout}
						>
							Logout
						</Menu.Item>
					</Menu>
				</Header>
				<Content style={{ padding: "0 50px", marginTop: 64 }}>
					<Breadcrumb style={{ margin: "16px 0" }}>
					</Breadcrumb>
					<div
						style={{
							background: "#fff",
							padding: 24,
							minHeight: 380
						}}
					>
						<Switch>

							<Route
								exact
								path="/home/"
								render={() => <Hom history={this.props.history} />}
							/>
							<Route
								path="/home/world"
								render={() => <Root history={this.props.history} />}
							/>
							<Route
								path="/home/USA"
								render={() => <Dashboard history={this.props.history} />}
							/>
							<Route
								path="/home/states"
								render={() => <States history={this.props.history} />}
							/>
							<Route
								render={() => <Hom history={this.props.history} />}
							/>
						</Switch>
					</div>
				</Content>
				<Footer style={{ textAlign: "center" }}>

				</Footer>
			</Layout>
		);
	}
}
export default Home;