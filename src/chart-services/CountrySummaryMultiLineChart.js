import * as d3 from 'd3'

export const CountrySummaryMultiLineChart = {
    multiLineChart
}

function multiLineChart(newCountry1Data, newCountry2Data, newCountry3Data, type, id) {
    console.log('newCountry1Data, newCountry2Data, newCountry3Data ', newCountry1Data, newCountry2Data, newCountry3Data)
    // if(country1Data.data.length !== 0 && country1Data.data.length <= 80){
    //     countrya = country1Data.data.slice(country1Data.data.length - 80);
    // }else{
    //     countrya = country1Data
    // }
    // if(result[1].data.length !== 0 && result[1].data.length <= 80){
    //     countryb = result[1].data.slice(country1Data.data.length - 80);
    // }else{
    //     countryb = result[1]
    // }
    // if(result[2].data.length !== 0 && result[2].data.length <= 80){
    //     countryc = result[2].data.slice(country1Data.data.length - 80);
    // }else{
    //     countryc = result[2]
    // }
    // let newCountry1Data = [];
    // let newCountry2Data = [];
    // let newCountry3Data = [];

    // let strokeData = 10;

    // for (let i = 0; i < country1Data.length - 1; i++) {
    //     if (i % strokeData === 0) {
    //         newCountry1Data.push(country1Data[i])
    //     }
    // }
    // for (let i = 0; i < country2Data.length - 1; i++) {
    //     if (i % strokeData === 0) {
    //         newCountry2Data.push(country2Data[i])
    //     }
    // }
    // for (let i = 0; i < country3Data.length - 1; i++) {
    //     if (i % strokeData === 0) {
    //         newCountry3Data.push(country3Data[i])
    //     }
    // }

    d3.selectAll(`#${id} > *`).remove();

    

    const height = 300;
    const width = 1300;
    const svg = d3.select(`#${id}`)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

        const transition = d3.transition()
            .duration(500);

    // const tooltip = d3.select(`#${id}`)
    //     .append("div")
    //     .attr('class', 'tooltip_1')
    //     .style("position", "absolute")
    //     .style("z-index", "10")
    //     .style("visibility", "hidden")
    //     .text("a simple tooltip");


    let xData = '';
    if (newCountry1Data.length !== 0) {
        xData = newCountry1Data;
    } else if (newCountry2Data.length !== 0) {
        xData = newCountry2Data;
    } else if (newCountry3Data.length !== 0) {
        xData = newCountry3Data;
    }

    const dataDisplayLengthForX = d3.max([newCountry1Data.length, newCountry2Data.length, newCountry3Data.length]);


    const xScale = d3.scaleLinear()
        .range([0, width])
        .domain([0, (dataDisplayLengthForX - 1)]);
    const xAxis = d3.axisBottom(xScale).ticks(dataDisplayLengthForX - 1);

    if (xData !== '') {
        svg.append('g')
            .style('transform', `translateY(${height}px)`)
            .call(xAxis)
            .attr('fill', '#2a5171')
            .selectAll('text')
            .data(xData)
            .text(d => new Date(d['Date']).toDateString())
            .style('transform', 'rotate(54deg)')
            .style("text-anchor", "start")
            .attr('fill', 'wheat')

        const minVal = d3.min([d3.min(newCountry1Data, d => d[type]),
        d3.min(newCountry2Data, d => d[type]),
        d3.min(newCountry3Data, d => d[type])]);
        const maxVal = d3.max([d3.max(newCountry1Data, d => d[type]),
        d3.max(newCountry2Data, d => d[type]),
        d3.max(newCountry3Data, d => d[type])]);
        const yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([minVal, maxVal]);


        const yAxis = d3.axisLeft(yScale).tickFormat(d3.format(""));

        svg.append('g')
            .style('transform', `translateX(0)`)
            .call(yAxis)
            .attr('fill', '#2a5171')
            .selectAll('text')
            .attr('fill', 'wheat')



        const line = d3.line()
            .x((d, i) => xScale(i))
            .y((d, i) => yScale(d[type]))
            .curve(d3.curveMonotoneX)

        /* Curve of country 1 */
        if (newCountry1Data.length !== 0) {
            svg.append('path')
                .datum(newCountry1Data)
                .transition(transition)
                .delay(function (d, i) { return 50 * i; })
                .attr('fill', 'none')
                .attr("stroke", "antiquewhite")
                .attr("stroke-width", 3)
                
                .attr("d", line)
                
        }

        /* Curve of country 2 */
        if (newCountry2Data.length !== 0) {
            svg.append('path')
                .datum(newCountry2Data)
                .transition(transition)
                .delay(function (d, i) { return 50 * i; })
                .attr('fill', 'none')
                .attr("stroke", "yellow")
                .attr("stroke-width", 3)
                .attr("d", line)
        }

        /* Curve of country 3 */
        if (newCountry3Data.length !== 0) {
            svg.append('path')
                .datum(newCountry3Data)
                .transition(transition)
                .delay(function (d, i) { return 50 * i; })
                .attr('fill', 'none')
                .attr("stroke", "orchid")
                .attr("stroke-width", 3)
                .attr("d", line)
        }

        // const circles = svg.selectAll('circle')
        //     .data(data)
        //     .enter()
        //     .append('circle')
        //     .attr('cx', (d, i) => xScale(i))
        //     .attr('cy', d => yScale(d[type]))
        //     .attr('r', 5)
        //     .style('fill', 'orange')
        //     .style('zIndex', 10)



        /* x Label */
        svg.append('text')
            .text(type)
            .attr('x', width / 2)
            .attr('y', height + 100)
            .attr('fill', 'aliceblue')

        /* y Label */
        svg.append('text')
            .text('Total Lives')
            .attr("x", -height + 80)
            .attr("y", -50)
            .style('transform', 'rotate(-90deg)')
            .style('textAnchor', 'middle')
            .attr('fill', 'aliceblue')

        /* Legend for country1 */
        if (newCountry1Data.length !== 0) {
            svg.append('circle')
                .attr('cx', 10)
                .attr('cy', -15)
                .attr('r', 5)
                .style('fill', 'antiquewhite');
            svg.append('text')
                .text(newCountry1Data[0].Country)
                .attr("x", 20)
                .attr("y", -10)
                .attr('fill', 'antiquewhite')
        }

        /* Legend for country2 */
        if (newCountry2Data.length !== 0) {
            svg.append('circle')
                .attr('cx', 10)
                .attr('cy', -35)
                .attr('r', 5)
                .style('fill', 'yellow');
            svg.append('text')
                .text(newCountry2Data[0].Country)
                .attr("x", 20)
                .attr("y", -30)
                .attr('fill', 'yellow')
        }

        /* Legend for country3 */
        if (newCountry3Data.length !== 0) {
            svg.append('circle')
                .attr('cx', 10)
                .attr('cy', -55)
                .attr('r', 5)
                .style('fill', 'orchid');
            svg.append('text')
                .text(newCountry3Data[0].Country)
                .attr("x", 20)
                .attr("y", -50)
                .attr('fill', 'orchid')
        }


        // circles.on("mouseover", function (d) {
        //     return tooltip.style("visibility", "visible").style("top", (d3.event.pageY) + "px")
        //         .style("left", d3.event.pageX + "px").html(
        //             `
        //                         <div>
        //                             <b>Information</b>
        //                             <div><small>${type}: ${d[type]}</small></div>
        //                         </div>
        //                     `
        //         );
        // })
        // circles.on("mousemove", function () {
        //     return tooltip.style("top", (d3.event.pageY) + "px")
        //         .style("left", d3.event.pageX + "px").style("visibility", "visible");
        // })
        // circles.on("mouseout", function () {
        //     return tooltip.style("visibility", "hidden");
        // });
    }
}