import * as d3 from 'd3'

export const CountrySummarySingleLineChart = {
    singleLineChart
}


function singleLineChart(data, type, id, loggedCountryName) {
    let newData = [];
    let strokeData = 2;
    if (data.length <= 70) {
        strokeData = 7
    } else if (data.length <= 120) {
        strokeData = 8
    }
    else if (data.length <= 150) {
        strokeData = 9
    } else if (data.length <= 200) {
        strokeData = 10
    }
    for (let i = 0; i < data.length - 1; i++) {
        if (i % strokeData === 0) {
            newData.push(data[i])
        }
    }
    data = newData;
    d3.selectAll(`#${id} > *`).remove();
    const height = 300;
    const width = 500;
    const svg = d3.select(`#${id}`)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    const tooltip = d3.select(`#${id}`)
        .append("div")
        .attr('class', 'tooltip_1')
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .text("a simple tooltip");

    const xScale = d3.scaleLinear()
        .range([0, width])
        .domain([0, (data.length - 1)]);

    const xAxis = d3.axisBottom(xScale).ticks(data.length - 1);

    svg.append('g')
        .style('transform', `translateY(${height}px)`)
        .call(xAxis)
        .attr('fill', '#2a5171')
        .selectAll('text')
        .data(data)
        .text(d => new Date(d['Date']).toDateString())
        .style('transform', 'rotate(54deg)')
        .style("text-anchor", "start")
        .attr('fill', 'wheat')

    const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([d3.min(data, (d) => d[type]), d3.max(data, (d) => d[type])]);


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

    const circles = svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => xScale(i))
        .attr('cy', d => yScale(d[type]))
        .attr('r', 5)
        .style('fill', 'orange')
        .style('zIndex', 10)


    svg.append('path')
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 3)
        .attr("d", line)

    svg.append('text')
        .text(type)
        .attr('x', width / 2)
        .attr('y', height + 100)
        .attr('fill', 'aliceblue')

    svg.append('text')
        .text('Total Lives')
        .attr("x", -height + 80)
        .attr("y", -50)
        .style('transform', 'rotate(-90deg)')
        .style('textAnchor', 'middle')
        .attr('fill', 'aliceblue')

    svg.append('circle')
        .attr('cx', 14)
        .attr('cy', -15)
        .attr('r', 5)
        .style('fill', 'orange');

    svg.append('text')
        .text(loggedCountryName)
        .attr("x", 20)
        .attr("y", -10)
        .attr('fill', 'aliceblue')

    circles.on("mouseover", function (d) {
        return tooltip.style("visibility", "visible").style("top", (d3.event.pageY) + "px")
            .style("left", d3.event.pageX + "px").html(
                `
                            <div>
                                <b>Information</b>
                                <div><small>${type}: ${d[type]}</small></div>
                            </div>
                        `
            );
    })
    circles.on("mousemove", function () {
        return tooltip.style("top", (d3.event.pageY) + "px")
            .style("left", d3.event.pageX + "px").style("visibility", "visible");
    })
    circles.on("mouseout", function () {
        return tooltip.style("visibility", "hidden");
    });

}