import * as d3 from 'd3';

class GroupedBar {

    constructor() {
        let height = 500;
        let width = 800;

        this.margin = {
            left: 30,
            top: 20,
            right: 20,
            bottom: 30
        };

        this.chartWidth = width - this.margin.left - this.margin.right;
        this.chartHeight = height - this.margin.top - this.margin.bottom;

        this.g = d3.select('.content')
            .append('svg')
            .attr('height', height)
            .attr('width', width)
            .attr('class', 'chart')
            .append('g')
            .attr('height', this.chartHeight)
            .attr('width', this.chartWidth)
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        // Scales
        this.scaleX = d3.scaleBand().range([0, this.chartWidth]).paddingInner(0.1);
        this.scaleY = d3.scaleLinear().range([this.chartHeight, 0]);
        this.scaleBarColor = d3.scaleOrdinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    }

    render() {
        d3.csv('/resources/age_group_data.csv', (row, index, columns) => {
            for(let i=1; i<columns.length; i++) {
                row[columns[i]] = +row[columns[i]];
            }

            return row;
        }, (error, data) => {
            let dataColumns = data.columns.slice(1);
            let nameColumn = data.columns[0];

            // Set the domains for the scales.
            this.scaleX.domain(data.map((row) => row[nameColumn]));
            this.scaleY.domain([0, d3.max(data, (row) => {
                return d3.max(dataColumns, (col) => {
                    return row[col];
                });
            })]);
            this.scaleBarColor.domain(dataColumns);
            this.scaleBar = d3.scaleBand()
                .range([0, this.scaleX.bandwidth()])
                .domain(dataColumns)
                .paddingInner(0.05);

            // Selects.
            this.g.selectAll('g')
                .data(data)
                .enter()
                .append('g')
                .attr('transform', (row) => `translate(${this.scaleX(row[nameColumn])}, 0)`)
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
                .attr('x', (d) => this.scaleBar(d.col))
                .attr('y', (d) => this.scaleY(d.value))
                .attr('height', (d) => this.chartHeight - this.scaleY(d.value))
                .attr('width', (d) => this.scaleBar.bandwidth())
                .attr('fill', (d) => this.scaleBarColor(d.col));

            // Axes
            this.g.append('g')
                .call(d3.axisBottom(this.scaleX))
                .attr('transform', `translate(0, ${this.chartHeight})`);

            this.g.append('g')
                .call(d3.axisLeft(this.scaleY).ticks(null, 's'));

            // Legend
            let legend = this.g.append('g')
                .attr('font-family', 'sans-serif')
                .attr('font-size', 10)
                .attr('transform', `translate(${this.chartWidth - this.margin.right}, 0)`)
                .selectAll('g')
                .data(dataColumns)
                .enter()
                .append('g')
                .attr('transform', (col, index) => {
                    return `translate(0, ${20*index})`;
                });

            legend
                .append('text')
                .text((d) => d)
                .attr('text-anchor', 'end')
                .attr('x', -5)
                .attr('y', 12.5);

            legend
                .append('rect')
                .attr('height', 19)
                .attr('width', 20)
                .attr('fill', this.scaleBarColor);
        })
    }
}

export default GroupedBar;