/// <reference path="./types/d3.d.ts" />

var width = 2500;

var canvas = d3.select('#canvas').append('svg')
    .attr('width', width)
    .attr('height', 500);

var data: number[] = d3.range(200);

var lastVal: number = 0;
var currVal: number = 0;
var generator = d3.random.normal(0, .05);
data = data.map( (i) => {
    currVal = generator();
    lastVal = lastVal + currVal;
    return lastVal;
});

var minMax: number[] = [d3.min(data),  d3.max(data)];

var yScale = d3.scale.linear()
    .domain(minMax)
    .range([200, 0]);

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

canvas.append("g")
    .attr("class",     "axis")
    .attr("transform", "translate(50,0)")
    .call(yAxis);

var bars = canvas.selectAll('.bar')
    .data(data)

canvas.append('line')
    .attr('x1', 50)
    .attr('x2', width)
    .attr('y1', yScale(0))
    .attr('y2', yScale(0))

bars.enter()
    .append('rect')
    .attr('class',  'bar')
    .attr('width',  2)
    .attr('height', (d)   => yScale(0) - yScale( Math.abs(d)))
    .attr('y',      (d)   => yScale(Math.max(d, 0)))
    .attr('x',      (d,i) => 100 + i * 3)
    .style('fill',  (d)   => (d > 0) ? '#999':'#F88');
