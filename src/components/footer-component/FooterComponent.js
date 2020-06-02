import React, { Component } from 'react'
import './FooterComponent.css'

export default class FooterComponent extends Component {
    render() {
        return (
            <div>
                <header className="mie_title">
                    Inspiration
                        </header>
                <div className="ft_gh">
                    Application is created with React-Framework. Graphs by d3.js. Its fetching live data provided by <a href="https://covid19api.com/">covid19api.</a>
                    <div>Created in public interest.</div>
                    <div>Coded and Designed with <font color="red">&#10084;</font> by Priyanka</div>
                </div>
            </div>
        )
    }
}
