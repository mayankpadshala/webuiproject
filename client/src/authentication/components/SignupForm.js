import React, { Component } from "react";
import { Form, Input, Button, Row, Col, Icon } from "antd";
import axios from "axios";
import "../../media/css/login.css";
import UserStatus from "../../UserStatus";
import { POST_USER_SIGNUP } from "../../helpers/Apis";

const FormItem = Form.Item;

// const [form] = Form.useForm();
// const LoginForm = Form.create({ name: "signupForm" })(
	class LoginForm extends Component {
		constructor(props) {
			super(props);
			this.state = {
				fname: "",
				lname: "",
				username: "",
				email: "",
				password: "",
				error: "",
			};
        }
		handleSubmit = async (e) => {
            e.preventDefault();
			try {
                const values = await this.props.form.validateFields();
				let response = await axios.post(POST_USER_SIGNUP,values
				);
				UserStatus.logIn(response.data._id);
				this.props.history.push("/home");
			} catch (error) {
                console.log("error", error);
                if(error.response){
                    this.setState({
                        error: "User Already Exist!!"
                    })
                }else{
                    console.log('input errors');
                }
			}
		};
		render() {
			const { form } = this.props;
			const { getFieldDecorator } = form;
			return (
				<Form onSubmit={this.handleSubmit} className="login-form">
					<p className="login-form-common-err">{this.state.error}</p>
					<Row>
						<Col xs={24} sm={24} md={21} lg={19} xl={12}>
							<FormItem hasFeedback name="fname">
								{getFieldDecorator("fname", {
									rules: [
										{
											required: true,
											message:
												"Please input your First Name!"
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
										name={"fname"}
										placeholder="First Namae"
									/>
								)}
							</FormItem>
						</Col>
						<Col xs={24} sm={24} md={21} lg={19} xl={12}>
							<FormItem hasFeedback name="lname">
								{getFieldDecorator("lname", {
									rules: [
										{
											required: true,
											message:
												"Please input your Last Name!"
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
										name={"lname"}
										placeholder="Last Namae"
									/>
								)}
							</FormItem>
						</Col>
					</Row>
					<FormItem hasFeedback name="username">
						{getFieldDecorator("username", {
							rules: [
								{
									required: true,
									message: "Please input your Username!"
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
								name={"username"}
								placeholder="Username"
							/>
						)}
					</FormItem>
					<FormItem hasFeedback name="email">
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
					<FormItem hasFeedback name="password">
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
							Sign Up
						</Button>
						<Row type="flex" align="middle" justify="space-between">
							<a className="login-form-forgot" href="/">
								Forgot password
							</a>
							Or
							<a href="/login">Log-in now!</a>
						</Row>
					</FormItem>
				</Form>
			);
		}
	}
// );
export default Form.create()(LoginForm);
