import * as d3 from 'd3';

class GroupedBar {
    constructor() {
        let height = 500;
        let width = 800;

        this.margin = {
            top: 20,
            left: 20,
            bottom: 20,
            right: 20
        };

        let barColors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];

        this.svg = d3.select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'chart');

        this.containerHeight = height - this.margin.top - this.margin.bottom;
        this.containerWidth = width - this.margin.left - this.margin.right;

        this.scaleX = d3.scaleBand().range([0, this.containerWidth]);
        this.scaleY = d3.scaleLinear().range([this.containerHeight, 0]);
        this.scaleBarColor = d3.scaleOrdinal().range(barColors);
    }

    render() {
        d3.csv('/resources/age_group_data.csv', (data, index, columns) => {
            columns.forEach((col, i) => {
                if (i > 0) {
                    data[col] = +data[col];
                }
            });
            return data;
        }, (data) => {
            let g = this.svg.append('g')
                .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
                // .attr('height', this.containerHeight)
                // .attr('width', this.containerWidth);

            let dataColumns = data.columns.slice(1);

            this.scaleX.domain(data.map((row) => row[data.columns[0]]));
            this.scaleGroup = d3.scaleBand().range([0, this.scaleX.bandwidth()]);
            this.scaleY.domain([0, d3.max(data, (row) => {
                return d3.max(dataColumns, (col) => {
                    return row[col];
                });
            })]);
            this.scaleGroup.domain(dataColumns);
            this.scaleBarColor.domain(dataColumns);

            let ret = g.selectAll('g')
                .data(data)
                .enter()
                .append('g')
                .attr('transform', (row) => {
                    return `translate(${this.scaleX(row[data.columns[0]])}, 0)`;
                })
                .selectAll('rect')
                .data((row) => {
                    return dataColumns.map((col) => {
                        return {
                            col,
                            value: row[col]
                        };
                    });
                })
                .enter()
                .append('rect')
                .attr('x', (bar) => this.scaleGroup(bar.col))
                .attr('y', (bar) => this.scaleY(bar.value))
                .attr('height', (bar) => this.containerHeight - this.scaleY(bar.value))
                .attr('width', this.scaleGroup.bandwidth())
                .attr('fill', (bar) => this.scaleBarColor(bar.col));

            console.log("Rendered a grouped bar graph");
        });
    }
}

export default GroupedBar;