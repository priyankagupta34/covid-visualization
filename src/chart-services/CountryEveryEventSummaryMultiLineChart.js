import * as d3 from 'd3'

export const CountryEveryEventSummaryMultiLineChart = {
    vividMultiLineChart
}

function vividMultiLineChart(id, data) {
    let newData = [], activeData = [], confimedData = [], deathData = [], strokeData = 10;
    const colorRecov = '#62b80d', colorActive = 'yellow', colorConfirmed = 'lightblue', colorDeath = 'crimson';
    for (let i = 0; i < data.length - 1; i++) {
        if (i % strokeData === 0) {
            newData.push(data[i]);
        }
    }
    if ((data.length - 1) % strokeData !== 0) {
        newData.push(data[data.length - 1]);
    }

    const minVal = d3.min([
        d3.min(newData, d => d['Recovered']),
        d3.min(newData, d => d['Active']),
        d3.min(newData, d => d['Confirmed']),
        d3.min(newData, d => d['Deaths'])
    ]);

    const maxVal = d3.max([
        d3.max(newData, d => d['Recovered']),
        d3.max(newData, d => d['Active']),
        d3.max(newData, d => d['Confirmed']),
        d3.max(newData, d => d['Deaths'])
    ]);

    d3.selectAll(`#${id} > *`).remove();
    const height = 300;
    const width = 1250;
    // const width = 500;
    const svg = d3.select(`#${id}`)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    /* Defining ranges for y scale */
    const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([minVal, maxVal]);

    /* Defining ranges and format for x scale */
    const yAxis = d3.axisLeft(yScale).tickFormat(d3.format(''));

    /* Defining ranges for x scale */
    const xScale = d3.scaleLinear()
        .range([0, width])
        .domain([0, newData.length-1]);

    /* Defining ranges and format for x scale */
    const xAxis = d3.axisBottom(xScale);

    /* Now attaching x-scale in svg */
    svg.append('g')
        .style('transform', `translateY(${height}px)`)
        .call(xAxis)
        .attr('fill', '#2a5171')
        .selectAll('text')
        .data(newData)
        .text(d => new Date(d['Date']).toLocaleDateString())
        .style('transform', 'rotate(54deg)')
        .style('text-anchor', 'start')
        .attr('fill', 'wheat');

    /* Now attaching y-scale in svg */
    svg.append('g')
        .style('transform', `translateX(0)`)
        .call(yAxis)
        .attr('fill', '#2a5171')
        .selectAll('text')
        .attr('fill', 'wheat');

    /* Generating line for Recovered */
    const lineRecovered = d3.line()
        .x((d, i) => xScale(i))
        .y((d, i) => yScale(d['Recovered']))
        .curve(d3.curveMonotoneX);

    /* Generating line for Active */
    const lineActive = d3.line()
        .x((d, i) => xScale(i))
        .y((d, i) => yScale(d['Active']))
        .curve(d3.curveMonotoneX);

    /* Generating line for Confirmed */
    const lineConfirmed = d3.line()
        .x((d, i) => xScale(i))
        .y((d, i) => yScale(d['Confirmed']))
        .curve(d3.curveMonotoneX);

    /* Generating line for Deaths */
    const lineDeaths = d3.line()
        .x((d, i) => xScale(i))
        .y((d, i) => yScale(d['Deaths']))
        .curve(d3.curveMonotoneX);

    const path1 = svg.append('path')
        .datum(newData)
        .attr("class", "line")
        .attr('fill', 'none')
        .attr('stroke', colorRecov)
        .attr('stroke-width', 3)
        .attr('d', lineRecovered);

    const path2 = svg.append('path')
        .datum(newData)
        .attr("class", "line")
        .attr('fill', 'none')
        .attr('stroke', colorActive)
        .attr('stroke-width', 3)
        .attr('d', lineActive);

    const path3 = svg.append('path')
        .datum(newData)
        .attr("class", "line")
        .attr('fill', 'none')
        .attr('stroke', colorConfirmed)
        .attr('stroke-width', 3)
        .attr('d', lineConfirmed);

    const path4 = svg.append('path')
        .datum(newData)
        .attr("class", "line")
        .attr('fill', 'none')
        .attr('stroke', colorDeath)
        .attr('stroke-width', 3)
        .attr('d', lineDeaths);




    /* x Label */
    svg.append('text')
        .text('All Events')
        .attr('x', (width / 2) - 40)
        .attr('y', height + 100)
        .attr('fill', 'aliceblue')

    /* y Label */
    svg.append('text')
        .text('Total Lives')
        .attr('x', -height + 80)
        .attr('y', -50)
        .style('transform', 'rotate(-90deg)')
        .style('textAnchor', 'middle')
        .attr('fill', 'aliceblue')

    /* Legend for recovered */
    svg.append('circle')
        .attr('cx', width + 20)
        .attr('cy', 0)
        .attr('r', 5)
        .style('fill', colorRecov)
        .style('cursor', 'pointer');

    svg.append('text')
        .text('Recovered')
        .attr('class', 'legend1')
        .attr('x', width + 35)
        .attr('y', 5)
        .attr('fill', colorRecov)
        .on('mouseover', () => (
            path1.attr('stroke', 'blue')
        ))
        .on('mouseout', () => (
            path1.attr('stroke', colorRecov)
        ))

    /* Legend for active */
    svg.append('circle')
        .attr('cx', width + 20)
        .attr('cy', 20)
        .attr('r', 5)
        .style('fill', colorActive)
        .style('cursor', 'pointer');

    svg.append('text')
        .text('Active')
        .attr('class', 'legend1')
        .attr('x', width + 35)
        .attr('y', 25)
        .attr('fill', colorActive)
        .on('mouseover', () => (
            path2.attr('stroke', 'blue')
        ))
        .on('mouseout', () => (
            path2.attr('stroke', colorActive)
        ))

    /* Legend for Confirmed */
    svg.append('circle')
        .attr('cx', width + 20)
        .attr('cy', 40)
        .attr('r', 5)
        .style('fill', colorConfirmed)
        .style('cursor', 'pointer');

    svg.append('text')
        .text('Confirmed')
        .attr('class', 'legend1')
        .attr('x', width + 35)
        .attr('y', 45)
        .attr('fill', colorConfirmed)
        .on('mouseover', () => (
            path3.attr('stroke', 'blue')
        ))
        .on('mouseout', () => (
            path3.attr('stroke', colorConfirmed)
        ))

    /* Legend for Deaths */
    svg.append('circle')
        .attr('cx', width + 20)
        .attr('cy', 60)
        .attr('r', 5)
        .style('fill', colorDeath)
        .style('cursor', 'pointer');

    svg.append('text')
        .text('Deaths')
        .attr('class', 'legend1')
        .attr('x', width + 35)
        .attr('y', 65)
        .attr('fill', colorDeath)
        .on('mouseover', () => (
            path4.attr('stroke', 'blue')
        ))
        .on('mouseout', () => (
            path4.attr('stroke', colorDeath)
        ))





    /*  gridlines in x axis function */
    function make_x_gridlines() {
        return d3.axisBottom(xScale)
            .ticks(10)
    }

    /* gridlines in y axis function */
    function make_y_gridlines() {
        return d3.axisLeft(yScale)
            .ticks(10)
    }


    /* add the X gridlines */
    svg.append('g')
        .attr('class', 'grid')
        .attr('transform', 'translate(0,' + height + ')')
        .call(make_x_gridlines()
            .tickSize(-height)
            .tickFormat("")
        )

    /* add the Y gridlines */
    svg.append('g')
        .attr('class', 'grid')
        .call(make_y_gridlines()
            .tickSize(-width)
            .tickFormat("")
        )
}