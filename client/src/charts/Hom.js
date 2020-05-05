import React from "react";
import axios from "axios";
import { Row, Col } from "antd";
import 'antd/dist/antd.css';
import { Line, Bar } from 'react-chartjs-2';
import { Menu, Dropdown, message, Button, Select, Card } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import CountUp from 'react-countup';

import StateChart from "./LineGraphs/StateChart"

class Hom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentState: 'CA',
            stateData: null,
            states: []
        };
    }
    componentDidMount() {
        this.getData();
    }
    getData = async () => {
        try {
            const r = await axios.get(
                `http://localhost:4001/chart/usa/` + this.state.currentState + `/population`
            );
            const result = await axios.get(
                `http://localhost:4001/data/allstates`
            );
            this.setState({
                stateData: r.data[0],
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

    onClick = async ({ key }) => {
        // message.info(`Click on item ${key}`);
        await this.setState({ currentState: key })
        this.getData();

    };

    render() {
        const { stateData, currentState } = this.state;

        const { Option } = Select;

        const onChange = async (value) => {
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
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select a State"
                        optionFilterProp="children"
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                            this.state.states.map(s =>
                                <Option value={s.name}>{s.value}</Option>
                            )
                        }
                    </Select>
                </Row>
                <Row type="flex" justify="center" style={{ height: 16 }}>
                </Row>
                <Row>
                    <Col span={8}>
                        {
                            stateData ? <Bar
                                data={{
                                    labels: ['Infected', 'Recovered', 'Deaths'],
                                    datasets: [
                                        {
                                            label: 'People Affected',
                                            backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                                            borderColor: 'rgba(0,0,0,1)',
                                            borderWidth: 2,
                                            data: [stateData.positive, stateData.recovered, stateData.death],
                                        },
                                    ],
                                }}
                                options={{
                                    maintainAspectRatio: false,
                                    legend: { display: false },
                                    title: {
                                        display: true,
                                        text: `Current status in ${currentState}`,
                                        fontSize: 16
                                    },
                                    scales: {
                                        xAxes: [
                                            {
                                                scaleLabel: {
                                                    display: true,
                                                    labelString: '',
                                                    fontColor: '#C7C7CC',
                                                    fontSize: 16
                                                }
                                            }
                                        ],
                                        yAxes: [
                                            {
                                                scaleLabel: {
                                                    display: true,
                                                    labelString: 'People affected',
                                                    fontColor: '#C7C7CC',
                                                    fontSize: 16
                                                }
                                            }
                                        ]
                                    },
                                    legend: {
                                        display: true,
                                        position: 'top'
                                    }
                                }}
                                height={400}
                            /> : null

                        }
                    </Col>
                    <Col span={16}>
                        <Row>

                            <Col span={1}>
                            </Col>
                            <Col span={7}>
                                <Card title="Active Infected cases" bordered={true}>
                                    <p style={{ color: 'blue' }}>{stateData ? <CountUp start={0} end={stateData.positive - stateData.recovered} duration={1.75} separator="," /> : 0}</p>
                                </Card>
                            </Col>
                            <Col span={1}>
                            </Col>
                            <Col span={7}>
                                <Card title="Total People Recovered" bordered={true}>
                                    <p style={{ color: 'green' }}>{stateData ? <CountUp start={0} end={stateData.recovered} duration={1.75} separator="," /> : 0}</p>
                                </Card>
                            </Col>
                            <Col span={1}>
                            </Col>
                            <Col span={7}>
                                <Card title="Total People Died" bordered={true}>
                                    <p style={{ color: 'red' }}>{stateData ? <CountUp start={0} end={stateData.death} duration={1.75} separator="," /> : 0}</p>
                                </Card>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" style={{ height: 16 }}>
                        </Row>
                        <Row>

                            <Col span={1}>
                            </Col>
                            <Col span={7}>
                                <Card title="Positive Increase Cases today" bordered={true}>
                                    <p style={{ color: 'black' }}>{stateData ? <CountUp start={0} end={stateData.positiveIncrease} duration={1.75} separator="," /> : 0}</p>
                                </Card>
                            </Col>
                            <Col span={1}>
                            </Col>
                            <Col span={7}>
                                <Card title="Neagtive Cases till Today" bordered={true}>
                                    <p style={{ color: 'black' }}> {stateData ? <CountUp start={0} end={stateData.negative} duration={1.75} separator="," /> : 0}</p>
                                </Card>
                            </Col>
                            <Col span={1}>
                            </Col>
                            <Col span={7}>
                                <Card title="Incrase in Neagtive Cases Today" bordered={true}>
                                    <p style={{ color: 'black' }}>{stateData ? <CountUp start={0} end={stateData.negativeIncrease} duration={1.75} separator="," /> : 0}</p>
                                </Card>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" style={{ height: 16 }}>
                        </Row>
                        <Row>

                            <Col span={1}>
                            </Col>
                            <Col span={7}>
                                <Card title="Total People Tested till date" bordered={true}>
                                    <p style={{ color: 'black' }}>{stateData ? <CountUp start={0} end={stateData.totalTests} duration={1.75} separator="," /> : 0}</p>
                                </Card>
                            </Col>
                            <Col span={1}>
                            </Col>
                            <Col span={7}>
                                <Card title="Increase in Test Cases Science Yesterday" bordered={true}>
                                    <p style={{ color: 'black' }}>{stateData ? <CountUp start={0} end={stateData.totalTestsIncrease} duration={1.75} separator="," /> : 0}</p>
                                </Card>
                            </Col>
                            <Col span={1}>
                            </Col>
                            <Col span={7}>
                                <Card title="Total population of State" bordered={true}>
                                    <p style={{ color: 'black' }}> {stateData ? <CountUp start={0} end={stateData.population} duration={1.75} separator="," /> : 0} </p>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={16}>
                </Row>
            </div >
        );
    }
}

export default Hom;
