import React from "react";
import axios from "axios";
import 'antd/dist/antd.css';
import { Line } from 'react-chartjs-2';
import { Select } from 'antd';
import CountUp from 'react-countup';


class StateChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dailyData: [],
            currentState: 'NY',
            states: [],
            latestData: null,
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
            const r = await axios.get(
                `http://localhost:4001/chart/usa/` + this.state.currentState + `/population`
            );
            this.setState({
                dailyData: res.data,
                latestData: r.data[0]
            });
        } catch (error) {
            if (error.response) {
                console.log("response error", error.response.data);
            } else {
                console.log("error", error);
            }
        }
    };

    render() {
        const { dailyData } = this.state;

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
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a State"
                    optionFilterProp="children"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                >
                    {
                        this.state.states.map(s =>
                            <Option value={s.name}>{s.value}</Option>
                        )
                    }
                </Select>
                <Line
                    data={{
                        labels: dailyData.map(({ date }) => date),
                        datasets: [{
                            data: dailyData.map((data) => data.positiveIncrease),
                            label: 'Daily Positive cases Increase',
                            borderColor: '#3333ff',
                            fill: true,
                        }, {
                            data: dailyData.map((data) => data.death),
                            label: 'Total deaths',
                            borderColor: 'red',
                            backgroundColor: 'rgba(255, 0, 0, 0.5)',
                            fill: true,
                        },
                        ],
                    }}
                    options={{
                        title: {
                            display: true,
                            text: statesVar[this.state.currentState] + " Day to Day Trends",
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


                <div>
                    <p><b>State Population:</b> {this.state.latestData ? <CountUp start={0} end={this.state.latestData.population} duration={1.75} separator="," /> : 0}</p>
                    <p><b>Total Tests conducted: </b>{this.state.latestData ? <CountUp start={0} end={this.state.latestData.totalTests} duration={1.75} separator="," /> : 0}</p>
                    <p><b>Tests by state population:</b> {this.state.latestData ? ((this.state.latestData.totalTests * 100) / this.state.latestData.population).toFixed(2) : 0} %</p>
                </div >
            </div >
        );
    }
}


export default StateChart;
