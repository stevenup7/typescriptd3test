/// <reference path="./d3/d3.d.ts" />

module Chart {

    export enum Alignment {left, right, top, bottom};
    var alignments = ['left', 'rigth', 'top', 'bottom']
    export interface margins {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    }

    export class D3Chart {
        title:   string;
        height:  number;
        width:   number;
        margins: margins;
        canvas:  any;

        constructor (title: string, elementSelector: string, width: number, height: number) {
            this.title = title;
            this.width = width;
            this.height = height;

            this.canvas = d3.select(elementSelector).append('svg')
                .attr('width',  width)
                .attr('height', height);
        }

        setMargins (m: margins) {
            this.margins = m;
        }

        addAxis (scale: number, orientation: Alignment) {
            var newAxis = d3.svg.axis()
                .scale(scale)
                .orient(alignments[orientation]);

            this.canvas.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(" + this.margins.left + ",0)")
                .call(newAxis);

        }
    }
}
