import React, { Component } from 'react'
import { CovidServices } from '../../services/CovidServices'
import { LimitServices } from '../../services/LimitServices'
import * as d3 from 'd3'
import './SummaryComponent.css'
import { Tooltip } from '@material-ui/core';

export default class SummaryComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventType: 'NewConfirmed',
            dataLengthSelection: 'top30'
        }
    }

    drawNewDeathChartForCurrent(data, calculationscene, type) {
        let slice = 40;
        let newDataSet = [];
        if (calculationscene === '0to20') {
            newDataSet = LimitServices.limitFromTwo(data, 0, 20, type);
        } else if (calculationscene === '21to50') {
            newDataSet = LimitServices.limitFromTwo(data, 21, 50, type);
        } else if (calculationscene === '51to120') {
            newDataSet = LimitServices.limitFromTwo(data, 51, 120, type);
        } else if (calculationscene === '121to1000') {
            newDataSet = LimitServices.limitFromTwo(data, 121, 1000, type);
        } else if (calculationscene === '1001to2000') {
            newDataSet = LimitServices.limitFromTwo(data, 1001, 2000, type);
        } else if (calculationscene === 'top40') {
            newDataSet = LimitServices.sortTopLivesInEvents(data, type, 40);
        }
        else if (calculationscene === 'top30') {
            slice = 30;
            newDataSet = LimitServices.sortTopLivesInEvents(data, type, 30);
        } else if (calculationscene === 'top20') {
            slice = 20;
            newDataSet = LimitServices.sortTopLivesInEvents(data, type, 20);
        } else if (calculationscene === 'top10') {
            slice = 10;
            newDataSet = LimitServices.sortTopLivesInEvents(data, type, 10);
        }
        if (slice > newDataSet.length) {
            slice = newDataSet.length
        }
        d3.selectAll("#cov_1 > *").remove();
        const height = 300;
        const width = 1300;

        newDataSet = newDataSet.slice(0, slice);
        let tooltip = d3.select("#cov_1")
            .append("div")
            .attr('class', 'tooltip')
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden");

        const transition = d3.transition()
            .duration(500);

        const xScale = d3.scaleLinear()
            .range([0, width])
            .domain([0, slice - 1]);


        const yScale = d3.scaleLinear()
            // .domain([0, 500])
            .domain([d3.min(newDataSet, d => d[type]), d3.max(newDataSet, d => d[type]) + 10])
            .range([height, 0]);

        const svg = d3.select("#cov_1")
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        /* Creating rectangle bars here */
        const bars = svg.selectAll('rect')
            .data(newDataSet)
            .enter()
            .append('rect')

        /* Display rectangle bars here */
        bars.transition(transition)
            .delay(function (d, i) { return 30 * i; })
            .attr('x', (d, i) => xScale(i))
            .attr('y', (d, i) => yScale(d[type]))
            .attr('width', 10)
            .attr('height', (d, i) => height - yScale(d[type]))
            .attr('fill', 'steelblue')
            .attr('rx', 3)


        /* Adding data over the bars for better visual effects */
        svg.selectAll('text')
            .data(newDataSet)
            .enter()
            .append('text')
            .attr('class', 'tx_mn')
            .text(d => `${LimitServices.abbreviateIntToReadableString(d[type])}`)
            .attr('dx', (d, i) => xScale(i))
            .attr('dy', (d, i) => yScale(d[type]) - 10)
            .style('fill', 'wheat')


        /* Adding y axis with formating data over */
        const yAxis = d3.axisLeft(yScale);
        svg.selectAll('g')
            .data(newDataSet)
            .enter()
            .append('g')
            .style("transform", `translateX(${0}px)`)
            .call(yAxis)
            .attr('fill', '#2a5171')
            .selectAll('text')
            .attr('fill', 'wheat')

        /* Adding x axis with formating data over */
        const xAxis = d3.axisBottom(xScale).ticks(slice - 1);
        svg.append('g')
            .style("transform", `translate(0,${height}px)`)
            .call(xAxis)
            .attr('fill', '#2a5171')
            .selectAll('text')
            .data(newDataSet)
            .text(d => d.Country)
            .attr("y", 0)
            .attr("x", 9)
            .style("transform", "rotate(54deg)")
            .style("text-anchor", "start")
            .style('fill', 'wheat')

        /* Proving single title on y axis */
        svg.append("text")
            .text(type)
            .attr("class", 'mn_txt_m')
            .attr("x", -height / 2)
            .attr("y", -60)
            .style('transform', 'rotate(-90deg)')
            .style('textAnchor', 'middle')
            .style('fill', 'wheat')

        bars.on("mouseover", function (d) {
            return tooltip.style("visibility", "visible").style("top", (d3.event.pageY) + "px")
                .style("left", d3.event.pageX + "px").html(
                    `
                            <div>
                                <b>Information</b>
                                <div><small>Country: ${d.Country}</small></div>
                                <div><small>NewDeaths: ${d.NewDeaths}</small></div>
                                <div><small>NewRecovered: ${d.NewRecovered}</small></div>
                                <div><small>NewConfirmed: ${d.NewConfirmed}</small></div>
                            </div>
                        `
                );
        })
        bars.on("mousemove", function () {
            return tooltip.style("top", (d3.event.pageY) + "px")
                .style("left", d3.event.pageX + "px").style("visibility", "visible");
        })
        bars.on("mouseout", function () {
            return tooltip.style("visibility", "hidden");
        });

    }

    eventTypeHandler(e) {
        this.setState({
            ...this.state,
            eventType: e.target.value
        }, () => {
            this.drawNewDeathChartForCurrent(this.props.summaryDataCountries, this.state.dataLengthSelection, this.state.eventType);
        })
    }

    dataLengthSelection(e) {
        this.setState({
            ...this.state,
            dataLengthSelection: e.target.value
        }, () => {
            this.drawNewDeathChartForCurrent(this.props.summaryDataCountries, this.state.dataLengthSelection, this.state.eventType);
        })
    }



    componentDidMount() {
        this.drawNewDeathChartForCurrent(this.props.summaryDataCountries, this.state.dataLengthSelection, this.state.eventType);
    }

    componentDidUpdate() {
        this.drawNewDeathChartForCurrent(this.props.summaryDataCountries, this.state.dataLengthSelection, this.state.eventType);
    }

    render() {
        const { eventType, dataLengthSelection } = this.state;
        return (
            <div>
                <header className="mie_title">
                    What's New Today
                </header>
                <small className="smll_hdr">*Select a Combination of this unfortunate event</small>
                <div className="nd_sm" >
                    <Tooltip title={'Select Any'}>
                        <select className="input_ser" value={eventType} onChange={this.eventTypeHandler.bind(this)}>
                            <option value="NewConfirmed">New Confirmed</option>
                            <option value="NewDeaths">New Deaths</option>
                            <option value="NewRecovered">New Recovered</option>
                            <option value="TotalConfirmed">Total Confirmed</option>
                            <option value="TotalDeaths">Total Deaths</option>
                            <option value="TotalRecovered">Total Recovered</option>
                        </select>
                    </Tooltip>

                    <Tooltip title="Number of Lives Faced the selected events">
                        <select className="input_ser" value={dataLengthSelection} onChange={this.dataLengthSelection.bind(this)}>
                            <option value="top40">Top 40</option>
                            <option value="top30">Top 30</option>
                            <option value="top20">Top 20</option>
                            <option value="top10">Top 10</option>
                            <option value="0to20">0 to 20</option>
                            <option value="21to50">21 to 50</option>
                            <option value="51to120">51 to 120</option>
                            <option value="121to1000">121 to 1000</option>
                            <option value="1001to2000">1001 to 2000</option>
                        </select>
                    </Tooltip>
                    <div id="cov_1"></div>
                </div>
            </div>
        )
    }
}
