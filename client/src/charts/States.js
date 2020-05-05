import React from "react";
import axios from "axios";
import { Row, Col } from "antd";
import 'antd/dist/antd.css';
import { Select } from 'antd';

import StateChart from "./LineGraphs/StateChart"

class States extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dailyData: [],
            currentState: 'NY',
            states: [],
        };
    }
    componentDidMount() {
        this.getData();
        this.getStates();
    }
    getStates = async () => {
        try {
            const result = await axios.get(
                `http://localhost:4001/data/allstates`
            );
            this.setState({
                states: result.data
            });
        } catch (error) {
            if (error.response) {
                console.log("response error", error.response.data);
            } else {
                console.log("error", error);
            }
        }
    };
    getData = async () => {
        try {
            const res = await axios.get(
                `http://localhost:4001/chart/usa/` + this.state.currentState
            );
            this.setState({
                dailyData: res.data
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

    onClick = async ({ key }) => {
        // message.info(`Click on item ${key}`);
        await this.setState({ currentState: key })
        this.getData();

    };

    render() {
        const { dailyData } = this.state;

        const { Option } = Select;

        const onChange = async (value) => {
            console.log(`selected ${value}`);
            await this.setState({ currentState: value })
            this.getData();
        }

        const onBlur = async () => {
            console.log('blur');
        }

        const onFocus = async () => {
            console.log('focus');
        }

        const onSearch = async (val) => {
            console.log('search:', val);
        }

        return (
            <div className="common-root">
                <Row type="flex" justify="center">
                    <h1>Comparision b/w States</h1>
                </Row>
                <Row>
                    <Col span={12}>

                        <StateChart />

                    </Col>
                    <Col span={12}>

                        <StateChart />

                    </Col>
                </Row>
            </div>
        );
    }
}

export default States;
