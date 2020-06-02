import './App.css';
import SummaryComponent from './components/summary-component/SummaryComponent';
import SummaryWithLineChartComponent from './components/summary-with-line-chart-component/SummaryWithLineChartComponent';
import { CovidServices } from './services/CovidServices'
import React, { Component } from 'react'
import HeaderComponent from './components/header-component/HeaderComponent';
import DisplayTotalCountComponent from './components/display-total-count-component/DisplayTotalCountComponent';
import MapDisplayComponent from './components/map-display-component/MapDisplayComponent';
import FooterComponent from './components/footer-component/FooterComponent';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      summaryDataCountries: [],
      loggedCountryName: '',
      loggedCountryCode: '',
      totals: '',
      countryList: []
    }
  }

  componentDidMount() {
    CovidServices.countryName()
      .then((result) => {
        this.setState({
          ...this.state,
          loggedCountryName: result.data.country_name,
          loggedCountryCode: result.data.country_code
        })
      }).catch((err) => {

      });
    CovidServices.todaysSummary()
      .then((result) => {
        this.setState({
          ...this.state,
          summaryDataCountries: result.data.Countries,
          totals: result.data.Global,
        })
      }).catch((err) => {

      });
    CovidServices.listAllCountries()
      .then((result) => {
        this.setState({
          ...this.state,
          countryList: result.data
        })
      }).catch((err) => {

      });

  }

  render() {
    const { summaryDataCountries, loggedCountryName, loggedCountryCode, totals, countryList } = this.state;
    return (
      <div className="art_ap">
        <HeaderComponent loggedCountryName={loggedCountryName} />
        <DisplayTotalCountComponent totals={totals} />
        <SummaryComponent summaryDataCountries={summaryDataCountries}
          loggedCountryName={loggedCountryName}

        />
        <MapDisplayComponent summaryDataCountries={summaryDataCountries} />
        <SummaryWithLineChartComponent
          summaryDataCountries={summaryDataCountries}
          loggedCountryName={loggedCountryName}
          countryList={countryList}          
          loggedCountryCode={loggedCountryCode}
        />
        <FooterComponent />
      </div>
    )
  }
}

