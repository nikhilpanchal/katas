import * as d3 from 'd3';

export default class GroupedBar {
    constructor() {
        let height = 500;
        let width = 800;

        this.margin = {
            top: 20,
            left: 20,
            bottom: 20,
            right: 20
        };

        this.graphHeight = height - this.margin.top - this.margin.bottom;
        this.graphWidth = width - this.margin.left - this.margin.right;

        this.g = d3.select('.content')
            .append('svg')
            .attr('height', height)
            .attr('width', width)
            .attr('class', 'chart')
            .append('g')
            .attr('height', this.graphHeight)
            .attr('width', this.graphWidth)
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        let barColors = ['red', 'blue', 'brown', 'green', 'orange', 'purple', 'grey'];

        // Scales and Ranges
        this.scaleX = d3.scaleBand().range([0, this.graphWidth]).paddingInner(0.1);
        this.scaleY = d3.scaleLinear().range([this.graphHeight, 0]);
        this.scaleBarColors = d3.scaleOrdinal().range(barColors);
    }

    render() {
        d3.csv('/resources/age_group_data.csv', (row, i, columns) => {
            for (let i = 1; i < columns.length; i++) {
                row[columns[i]] = +row[columns[i]];
            }

            return row;
        }, (error, data) => {
            let dataColumns = data.columns.slice(1);
            let nameColumn = data.columns[0];

            this.scaleX.domain(data.map((row) => {
                return row[nameColumn];
            }));

            this.scaleBarGroup = d3.scaleBand()
                .range([0, this.scaleX.bandwidth()])
                .domain(dataColumns)
                .paddingInner(0.05);

            this.scaleY.domain([0, d3.max(data, (row) => {
                return d3.max(dataColumns, (col) => {
                    return row[col];
                });
            })]);

            this.scaleBarColors.domain(dataColumns);

            // the action
            this.g.selectAll('g')
                .data(data)
                .enter()
                .append('g')
                .attr('transform', (row) => {
                    return `translate(${this.scaleX(row[nameColumn])}, 0)`;
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
                .attr('x', (d) => this.scaleBarGroup(d.col))
                .attr('y', (d) => this.scaleY(d.value))
                .attr('height', (d) => this.graphHeight - this.scaleY(d.value))
                .attr('width', (d) => this.scaleBarGroup.bandwidth())
                .attr('fill', (d) => this.scaleBarColors(d.col));

        })

    }
}