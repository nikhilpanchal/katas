import * as d3 from 'd3';

export default class GroupedBar {
    constructor() {
        let height = 500;
        let width = 800;

        this.margin = {
            top: 20,
            left: 40,
            bottom: 30,
            right: 20
        };

        this.chartHeight = height - this.margin.top - this.margin.bottom;
        this.chartWidth = width - this.margin.left - this.margin.right;

        this.g = d3.select('.content')
            .append('svg')
            .attr('height', height)
            .attr('width', width)
            .attr('class', 'chart')
            .append('g')
            .attr('height', this.chartHeight)
            .attr('width', this.chartWidth)
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        this.scaleX = d3.scaleBand().range([0, this.chartWidth]).paddingInner(0.1);
        this.scaleY = d3.scaleLinear().range([this.chartHeight, 0]);
        this.scaleBarColor = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    }

    render() {
        d3.csv('/resources/age_group_data.csv', (row, i, columns) => {
            for (let i = 1; i < columns.length; i++) {
                row[columns[i]] = +row[columns[i]];
            }

            return row;
        }, (error, data) => {
            let nameColumn = data.columns[0];
            let dataColumns = data.columns.slice(1);

            this.scaleX.domain(data.map((row) => row[nameColumn]));
            this.scaleBarGroup = d3.scaleBand()
                .range([0, this.scaleX.bandwidth()])
                .domain(dataColumns)
                .paddingInner(0.05);
            this.scaleY.domain([0, d3.max(data, (row) => {
                return d3.max(dataColumns, (col) => {
                    return row[col];
                });
            })]);
            this.scaleBarColor.domain(dataColumns);

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
                .attr('height', (d) => this.chartHeight - this.scaleY(d.value))
                .attr('width', (d) => this.scaleBarGroup.bandwidth())
                .attr('fill', (d) => this.scaleBarColor(d.col));

            this.g.append('g')
                .attr('transform', `translate(0, ${this.chartHeight})`)
                .call(d3.axisBottom(this.scaleX));
            this.g.append('g')
                .call(d3.axisLeft(this.scaleY).ticks(null, 's'));
        });

    }
}