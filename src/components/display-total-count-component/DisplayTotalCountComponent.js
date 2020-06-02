import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import './DisplayTotalCountComponent.css';

export default class DisplayTotalCountComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalCountRoundData: ''
        }
    }
    componentDidMount() {

    }
    render() {
        const { totals } = this.props;
        return (
            <>
                <div className="flexCentered">
                    <Grid container  spacing={2}>
                        <Grid item xs={2} className="centered">
                            <div className="cancelOverflow">
                                <div className="grovtd_67">
                                    <div>New Confirmed</div>
                                    <small>{totals.NewConfirmed}</small>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={2} className="centered">
                            <div className="cancelOverflow">
                                <div className="grovtd_67">
                                    <div>New Deaths</div>
                                    <small>{totals.NewDeaths}</small>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={2} className="centered">
                            <div className="cancelOverflow">
                                <div className="grovtd_67">
                                    <div>New Recovered</div>
                                    <small>{totals.NewRecovered}</small>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={2} className="centered ">
                            <div className="cancelOverflow">
                                <div className="grovtd_67 ">
                                    <div>Total Confirmed</div>
                                    <small>{totals.TotalConfirmed}</small>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={2} className="centered">
                            <div className="cancelOverflow">
                                <div className="grovtd_67">
                                    <div>Total Deaths</div>
                                    <small>{totals.TotalDeaths}</small>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={2} className="centered">
                            <div className="cancelOverflow">
                                <div className="grovtd_67">
                                    <div>Total Recovered</div>
                                    <small>{totals.TotalRecovered}</small>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                {/* <div className="flexCentered " style={{ marginTop: 15 }}>
                    <Grid container style={{ width: 700 }} spacing={2}>
                        <Grid item xs={4} className="centered ">
                            <div className="cancelOverflow">
                                <div className="grovtd_67 ">
                                    <div>Total Confirmed</div>
                                    <small>{totals.TotalConfirmed}</small>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={4} className="centered">
                            <div className="cancelOverflow">
                                <div className="grovtd_67">
                                    <div>Total Deaths</div>
                                    <small>{totals.TotalDeaths}</small>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={4} className="centered">
                            <div className="cancelOverflow">
                                <div className="grovtd_67">
                                    <div>Total Recovered</div>
                                    <small>{totals.TotalRecovered}</small>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div> */}
            </>
        )
    }
}
