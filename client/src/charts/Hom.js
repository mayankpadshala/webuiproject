import React from "react";
import axios from "axios";
import { Row, Col } from "antd";
import 'antd/dist/antd.css';
import { Line, Bar } from 'react-chartjs-2';
import { Menu, Dropdown, message, Button, Select, Card, Form, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import CountUp from 'react-countup';
import StateChart from './LineGraphs/StateChart'
import "../media/css/login.css";

class Hom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentState: 'NY',
            stateData: null,
            states: [],
            data: [],
            limit: 5,
        };
    }
    componentDidMount() {
        this.getData();
        this.getLocation();
    }
    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates);
        } else {
            alert("Geolocation is not supported by this browser.")
        }
    }
    getCoordinates = async (position) => {
        try {
            const r = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&sensor=false&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
            );
            // console.log('r',r.data);
            let results = r.data.results;
            for (var i = 0; i < results.length; i++) {
                if (results[i].types[0] === "locality") {
                    console.log('state', results[i].address_components[2].short_name);
                    this.setState({
                        currentState: results[i].address_components[2].short_name
                    })
                }
            }
        } catch (error) {
            if (error.response) {
                console.log("response error", error.response.data);
            } else {
                console.log("error", error);
            }
        }
    }
    getData = async () => {
        try {
            const r = await axios.get(
                `http://localhost:4001/chart/usa/` + this.state.currentState + `/population`
            );
            const result = await axios.get(
                `http://localhost:4001/data/allstates`
            );
            const res = await axios.get(
                `http://localhost:4001/chart/usa/` + this.state.currentState + `/limit/` + this.state.limit
            );
            this.setState({
                stateData: r.data[0],
                states: result.data,
                data: res.data,
            });
        } catch (error) {
            if (error.response) {
                console.log("response error", error.response.data);
            } else {
                console.log("error", error);
            }
        }
    };

    anayzeData = async () => {
        try {
            const res = await axios.get(
                `http://localhost:4001/chart/usa/` + this.state.currentState + `/limit/` + this.state.limit
            );
            this.setState({
                data: res.data,
            });
        } catch (error) {
            if (error.response) {
                console.log("response error", error.response.data);
            } else {
                console.log("error", error);
            }
        }
    }

    onClick = async ({ key }) => {
        // message.info(`Click on item ${key}`);
        await this.setState({ currentState: key })
        this.getData();

    };

    onChange = async (value) => {
        await this.setState({ currentState: value })
        this.getData();
    }

    onBlur = async () => {
        console.log('blur');
    }

    onFocus = async () => {
        console.log('focus');
    }

    onSearch = async (val) => {
        console.log('search:', val);
    }
    onFinishInput = async (values) => {
        console.log(values)
        await this.setState({ limit: values })
        this.anayzeData();
    };
    render() {
        const { stateData, currentState, data } = this.state;

        const { Option } = Select;

        const statesVar = {
            "AL": "Alabama",
            "AK": "Alaska",
            "AS": "American Samoa",
            "AZ": "Arizona",
            "AR": "Arkansas",
            "CA": "California",
            "CO": "Colorado",
            "CT": "Connecticut",
            "DE": "Delaware",
            "DC": "District Of Columbia",
            "FM": "Federated States Of Micronesia",
            "FL": "Florida",
            "GA": "Georgia",
            "GU": "Guam",
            "HI": "Hawaii",
            "ID": "Idaho",
            "IL": "Illinois",
            "IN": "Indiana",
            "IA": "Iowa",
            "KS": "Kansas",
            "KY": "Kentucky",
            "LA": "Louisiana",
            "ME": "Maine",
            "MD": "Maryland",
            "MA": "Massachusetts",
            "MI": "Michigan",
            "MN": "Minnesota",
            "MS": "Mississippi",
            "MO": "Missouri",
            "MT": "Montana",
            "NE": "Nebraska",
            "NV": "Nevada",
            "NH": "New Hampshire",
            "NJ": "New Jersey",
            "NM": "New Mexico",
            "NY": "New York",
            "NC": "North Carolina",
            "ND": "North Dakota",
            "MP": "Northern Mariana Islands",
            "OH": "Ohio",
            "OK": "Oklahoma",
            "OR": "Oregon",
            "PW": "Palau",
            "PA": "Pennsylvania",
            "PR": "Puerto Rico",
            "RI": "Rhode Island",
            "SC": "South Carolina",
            "SD": "South Dakota",
            "TN": "Tennessee",
            "TX": "Texas",
            "UT": "Utah",
            "VT": "Vermont",
            "VI": "Virgin Islands",
            "VA": "Virginia",
            "WA": "Washington",
            "WV": "West Virginia",
            "WI": "Wisconsin",
            "WY": "Wyoming"
        }

        const inputStr = <div>
            <h3>Change Number of Days</h3>
            <Input.Search
                placeholder="Input Days"
                onSearch={this.onFinishInput}
                style={{ width: 176 }}
                enterButton="Analyze"
            />
        </div>

        return (
            <div className="common-root">
                <Row type="flex" justify="center">
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select a State"
                        optionFilterProp="children"
                        onChange={this.onChange}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        onSearch={this.onSearch}
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
                                        text: `Current status in ${statesVar[currentState]}`,
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
                            <Col span={2}>
                            </Col>
                            <Col span={16}>
                                <Line
                                    data={{
                                        labels: data.map(({ date }) => date),
                                        datasets: [{
                                            data: data.map((data) => data.positiveIncrease),
                                            label: 'Daily Positive cases Increase',
                                            borderColor: '#3333ff',
                                            fill: true,
                                        },
                                        ],
                                    }}
                                    options={{
                                        title: {
                                            display: true,
                                            text: " Last " + this.state.limit + " Day Trend in " + statesVar[this.state.currentState],
                                            fontSize: 20
                                        },
                                        scales: {
                                            xAxes: [
                                                {
                                                    scaleLabel: {
                                                        display: true,
                                                        labelString: 'Date (YearMonthDay Format)',
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
                                />

                            </Col>
                            <Col span={6}>
                                <Row type="flex" justify="center">
                                    {inputStr}
                                </Row>
                            </Col>
                        </Row >

                    </Col>
                </Row>
                <Row style={{ height: 32 }}>

                </Row>
                <Row>
                    <Col span={4}>
                        <Card >
                            <h3>Active Infected cases</h3><h1 style={{ color: 'blue', margin: 0 }}>  {stateData ? <CountUp start={0} end={stateData.positive - stateData.recovered} duration={1.75} separator="," /> : 0}</h1>
                        </Card>
                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Card>
                            <h3>Total People Recovered</h3><h1 style={{ color: 'green', margin: 0 }}>{stateData ? <CountUp start={0} end={stateData.recovered} duration={1.75} separator="," /> : 0}</h1>
                        </Card>
                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Card>
                            <h3>Total People Died</h3><h1 style={{ color: 'red', margin: 0 }} >{stateData ? <CountUp start={0} end={stateData.death} duration={1.75} separator="," /> : 0}</h1>
                        </Card>
                    </Col>

                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Card>
                            <h3>Positive Increase Cases today</h3><h1 style={{ color: 'black', margin: 0 }}>{stateData ? <CountUp start={0} end={stateData.positiveIncrease} duration={1.75} separator="," /> : 0}</h1>
                        </Card>
                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Card>
                            <h3>Neagtive Cases till Today</h3><h1 style={{ color: 'black', margin: 0 }}> {stateData ? <CountUp start={0} end={stateData.negative} duration={1.75} separator="," /> : 0}</h1>
                        </Card>
                    </Col>
                </Row >
                <Row type="flex" justify="center" style={{ height: 16 }}>
                </Row>
                <Row>
                    <Col span={4}>
                        <Card>
                            <h3>Incrase in Neagtive Cases Today</h3><h1 style={{ color: 'black', margin: 0 }}>{stateData ? <CountUp start={0} end={stateData.negativeIncrease} duration={1.75} separator="," /> : 0}</h1>
                        </Card>
                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Card>
                            <h3>Total People Tested till date</h3><h1 style={{ color: 'black', margin: 0 }}>{stateData ? <CountUp start={0} end={stateData.totalTests} duration={1.75} separator="," /> : 0}</h1>
                        </Card>
                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Card>
                            <h3>TestCase Increase from Yesterday</h3><h1 style={{ color: 'black', margin: 0 }}>{stateData ? <CountUp start={0} end={stateData.totalTestsIncrease} duration={1.75} separator="," /> : 0}</h1>
                        </Card>
                    </Col >
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Card>
                            <h3>Total population of State</h3><h1 style={{ color: 'black', margin: 0 }}> {stateData ? <CountUp start={0} end={stateData.population} duration={1.75} separator="," /> : 0} </h1>
                        </Card>
                    </Col >
                </Row >
            </div >
        );
    }
}

export default Hom;
