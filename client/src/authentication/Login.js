import React, { Component } from "react";
import { Row, Col } from "antd";
import "../media/css/login.css";
import LoginForm from "./components/LoginForm";
class Login extends Component {
	render() {
        console.log('this.props',this.props);
		return (
			<Row
				className="login-root"
				type="flex"
				justify="center"
				align="middle"
			>
				<Col className="login-center-box" xs={24} sm={24} md={21} lg={19} xl={6}>
                    <Row className="my-m-b-50" type="flex" justify="center">
                        <img alt="logo" className="login-logo" src="/logo.png"></img>
                    </Row>
					<LoginForm history={this.props.history}/>
				</Col>
			</Row>
		);
	}
}

export default Login;
