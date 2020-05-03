import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Route, Switch } from "react-router-dom";
import "../media/css/home.css";
import Root from "./Root";
import Dashboard from "./Dashboard";
import UserStatus from "../UserStatus";
const { Header, Content, Footer } = Layout;

class Home extends React.Component {
	handleLogout = () => {
		// e.preventDefault();
		UserStatus.logOut();
		this.props.history.push("/login");
		// this.props.logout();
	};
	componentDidMount(){
		// this.props.history.push("/home/cricketer/create");
		// this.props.history.push("/home/cricketer/list");
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
						<Menu.Item key="1" onClick={()=>this.props.history.push("/home/root")} >Home</Menu.Item>
						<Menu.Item key="2" onClick={()=>this.props.history.push("/home/dashboard")} >Dashboard</Menu.Item>
						<Menu.Item
							key="4"
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
								path="/home/root"
								render={() => <Root history={this.props.history}/>}
								/>
							<Route
								path="/home/dashboard"
								render={() => <Dashboard  history={this.props.history}/>}
								/>
							{/* <Route
								render={() => <Root  history={this.props.history}/>}
							/> */}
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