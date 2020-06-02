import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import { CountrySummaryMultiLineChart } from '../../chart-services/CountrySummaryMultiLineChart';
import { CountrySummarySingleLineChart } from '../../chart-services/CountrySummarySingleLineChart';
import { CountryEveryEventSummaryMultiLineChart } from '../../chart-services/CountryEveryEventSummaryMultiLineChart';
import { CovidServices } from '../../services/CovidServices';
import './SummaryWithLineChartComponent.css';
import { CountrySummaryPieChart } from '../../chart-services/CountrySummaryPieChart';

export default class SummaryWithLineChartComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            countrya: '',
            countryb: '',
            countryc: '',
            countryList: [],
            eventType: 'Active',
            showLoader: ''
        }
    }


    componentDidMount() {
        this.countryWiseCompleteSummary(this.props.loggedCountryName);
        if (this.props.countryList.length !== 0) {
            this.setState({
                ...this.state,
                countryList: this.props.countryList,
                countrya: this.props.countryList[0].Slug,
                countryb: this.props.countryList[1].Slug,
                countryc: this.props.countryList[2].Slug
            }, () => {
                this.creatingMultiChartWithDataCapturing();
            })
        }
    }

    componentDidUpdate(prev) {
        this.countryWiseCompleteSummary(this.props.loggedCountryName);
        if (prev.countryList.length !== this.props.countryList.length) {
            this.setState({
                ...this.state,
                countryList: this.props.countryList,
                countrya: this.props.countryList[0].Slug,
                countryb: this.props.countryList[1].Slug,
                countryc: this.props.countryList[2].Slug
            }, () => {
                this.creatingMultiChartWithDataCapturing();
            })
        }
    }

    countryWiseCompleteSummary(country) {
        CovidServices.countryWiseData(country)
            .then((result) => {
                CountryEveryEventSummaryMultiLineChart.vividMultiLineChart('cov_2', result.data);
                CountrySummaryPieChart.vividPieChart(result.data[result.data.length - 1], CovidServices.getCountryPopulation(this.props.loggedCountryCode), 'cov_3');
                // setTimeout(() => {
                //     CountrySummarySingleLineChart.singleLineChart(result.data, 'Recovered', 'cov_2', this.props.loggedCountryName)
                // }, 0);
                // setTimeout(() => {
                //     CountrySummarySingleLineChart.singleLineChart(result.data, 'Active', 'cov_3', this.props.loggedCountryName)
                // }, 0);
                // setTimeout(() => {
                //     CountrySummarySingleLineChart.singleLineChart(result.data, 'Deaths', 'cov_4', this.props.loggedCountryName)
                // }, 0);
                // setTimeout(() => {
                //     CountrySummarySingleLineChart.singleLineChart(result.data, 'Confirmed', 'cov_5', this.props.loggedCountryName)
                // }, 0);

            }).catch((err) => {

            });
    }

    changingCountryHandler(country, event) {
        this.setState({
            ...this.state,
            [country]: event.target.value,
            showLoader: true
        }, () => {
            this.creatingMultiChartWithDataCapturing()
        })
    }

    creatingMultiChartWithDataCapturing() {
        Promise.all([CovidServices.countryWiseData(this.state.countrya),
        CovidServices.countryWiseData(this.state.countryb),
        CovidServices.countryWiseData(this.state.countryc)])
            .then((result) => {
                // console.log('ioioiio', result)
                let countrya = [];
                let countryb = [];
                let countryc = [];
                if (result[0].data.length !== 0 && result[0].data.length >= 50) {
                    countrya = result[0].data.slice(result[0].data.length - 50);
                }
                //  else {
                //     countrya = result[0].data
                // }
                if (result[1].data.length !== 0 && result[1].data.length >= 50) {
                    countryb = result[1].data.slice(result[1].data.length - 50);
                }
                // else {
                //     countryb = result[1].data
                // }
                if (result[2].data.length !== 0 && result[2].data.length >= 50) {
                    countryc = result[2].data.slice(result[2].data.length - 50);
                }
                // else {
                //     countryc = result[2].data
                // }
                CountrySummaryMultiLineChart.multiLineChart(
                    countrya,
                    countryb,
                    countryc, this.state.eventType, 'cov_6');
                this.setState({
                    ...this.state,
                    showLoader: false
                })
            }).catch((err) => {
                this.setState({
                    ...this.state,
                    showLoader: true
                })
            });

    }

    render() {
        const { countrya, countryb, countryc, eventType, showLoader } = this.state;
        const { loggedCountryName, countryList } = this.props;

        return (
            <div>
                {loggedCountryName !== '' &&
                    <>
                        <header className="mie_title">
                            {loggedCountryName}'s Entire Covid History
                        </header>
                        <small className="smll_hdr">*Quick review over covid history of your country</small>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <div className="nd_sm">
                                    <div className="trackerTitle">Track all Events</div>
                                    <div id="cov_2"></div>
                                </div>
                            </Grid>
                            {/* <Grid item xs={6}>
                                <div className="nd_sm">
                                    <div id="cov_3"></div>
                                </div>
                            </Grid> */}
                        </Grid>

                        <header className="mie_title">
                            Now Let's Compare this pandemic
                        </header>
                        <small className="smll_hdr">*For Better and Quick Visual comparision, select 3 countries from dropdown and press Go</small>
                        <div className="nd_sm">
                            <div>
                                <select className="input_ser" value={countrya} onChange={this.changingCountryHandler.bind(this, 'countrya')}>
                                    {countryList.map(item =>
                                        <option key={item.country} value={item.Slug}>{item.Country}</option>
                                    )}
                                </select>
                                <select className="input_ser" value={countryb} onChange={this.changingCountryHandler.bind(this, 'countryb')}>
                                    {countryList.map(item => (
                                        <option key={item.country} value={item.Slug}>{item.Country}</option>
                                    )
                                    )}
                                </select>
                                <select className="input_ser" value={countryc} onChange={this.changingCountryHandler.bind(this, 'countryc')}>
                                    {countryList.map(item => (
                                        <option key={item.Country} value={item.Slug}>{item.Country}</option>
                                    )
                                    )}
                                </select>
                            </div>
                            <select className="input_ser" value={eventType} onChange={this.changingCountryHandler.bind(this, 'eventType')}>
                                <option key={'Active'} value={'Active'}>Active</option>
                                <option key={'Confirmed'} value={'Confirmed'}>Confirmed</option>
                                <option key={'Deaths'} value={'Deaths'}>Deaths</option>
                                <option key={'Recovered'} value={'Recovered'}>Recovered</option>
                            </select>

                            <div style={{ height: 50 }}>
                                {showLoader &&
                                    <img src="loader.gif"></img>}
                            </div>

                            <div id="cov_6"></div>
                        </div>

                    </>
                }
            </div>
        )
    }
}
