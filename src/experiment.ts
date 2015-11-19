/// <reference path="./d3/d3.d.ts" />
/// <reference path="./d3-keybuilder.ts" />
/// <reference path="./d3-chart.ts" />

var width = 2500;

var chart: Chart.D3Chart;

chart = new Chart.D3Chart('Test Viz', '#canvas', width, 500);

chart.setMargins({top: 20, left: 50});

var data: number[] = d3.range(200);

var lastVal: number = 0;
var currVal: number = 0;
var generator = d3.random.normal(0, .05);

data = data.map( (i: number) => {
    currVal = generator();
    lastVal = lastVal + currVal;
    return lastVal;
});

var minMax: number[] = [d3.min(data),  d3.max(data)];
var yScale = d3.scale.linear()
    .domain(minMax)
    .range([200, 0]);

chart.addAxis(yScale, Chart.Alignment.left);

var bars = chart.canvas.selectAll('.bar')
    .data(data)

chart.canvas.append('line')
    .attr('x1', chart.margins.left)
    .attr('x2', width)
    .attr('y1', yScale(0))
    .attr('y2', yScale(0))

bars.enter()
    .append('rect')
    .attr('class',  'bar')
    .attr('width',  2)
    .attr('height', (d: number)           => yScale(0) - yScale( Math.abs(d)))
    .attr('y',      (d: number)           => yScale(Math.max(d, 0)))
    .attr('x',      (d: number,i: number) => 100 + i * 3)
    .style('fill',  (d: number)           => (d > 0) ? '#999':'#F88');
