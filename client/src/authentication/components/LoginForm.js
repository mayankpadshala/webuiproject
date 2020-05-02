import React, { Component } from "react";
import { Form, Input, Button, Row, Icon } from "antd";
import axios from "axios";
import "../../media/css/login.css";
import UserStatus from "../../UserStatus";
import { POST_USER_LOGIN } from "../../helpers/Apis";

const FormItem = Form.Item;

const LoginForm = Form.create({ name: "loginForm" })(
	class Login extends Component {
		constructor(props) {
			super(props);
			this.state = {
				email: "",
				password: "",
                error: "",
			};
		}
		handleSubmit = async (e) => {
            e.preventDefault();
			try {
                const values = await this.props.form.validateFields();
				let response = await axios.post(POST_USER_LOGIN,values);
				UserStatus.logIn(response.data._id);
				this.props.history.push("/home");
			} catch (error) {
				console.log("error", error);
				if (error.response) {
					this.setState({
						error: "Email and Password do not match!!"
					});
				}
			}
		};
		render() {
			const { getFieldDecorator } = this.props.form;
			return (
				<Form onSubmit={this.handleSubmit} className="login-form">
					<p className="login-form-common-err">{this.state.error}</p>
					<FormItem hasFeedback>
						{getFieldDecorator("email", {
							rules: [
								{
									required: true,
									message: "Please input your email!"
								},
								{
									type: "email",
									message: "Please input valid email!"
								}
							]
						})(
							<Input
								prefix={
									<Icon
										type="user"
										style={{ fontSize: 13 }}
									/>
								}
								name={"email"}
								placeholder="Email"
							/>
						)}
					</FormItem>
					<FormItem hasFeedback>
						{getFieldDecorator("password", {
							rules: [
								{
									required: true,
									message: "Please input your Password!"
								}
							]
						})(
							<Input.Password
								prefix={
									<Icon
										type="lock"
										style={{ fontSize: 13 }}
									/>
								}
								name={"password"}
								type="password"
								placeholder="Password"
							/>
						)}
					</FormItem>
					<FormItem>
						<Button
							type="primary"
							htmlType="submit"
                            className="login-form-button"
						>
							Log in
						</Button>
						<Row type="flex" align="middle" justify="space-between">
							<a className="login-form-forgot" href="/">
								Forgot password
							</a>
							Or
							<a href="/signup">register now!</a>
						</Row>
					</FormItem>
				</Form>
			);
		}
	}
);
export default LoginForm;
