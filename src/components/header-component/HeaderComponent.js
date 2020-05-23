import React, { Component } from 'react'
import './HeaderComponent.css'
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';

export default class HeaderComponent extends Component {
    render() {
        return (
            <div className="hd_c">
                <Grid container>
                    <Grid item xs={3}>
                        <div className="titl">Live Covid Statistics</div>
                    </Grid>
                    <Grid item xs={8}></Grid>
                    <Grid item xs={1} className="righted mn_sb">
                    <div style={{widh: 100, textAlign: "right"}}>
                        <div className="su_tle">{this.props.loggedCountryName}</div>
                        <Divider style={{color: 'wheat'}}/>
                        <div className="su_tle">{new Date().toDateString()}</div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
