import * as d3 from 'd3';

class GroupedBar {
    constructor() {
        this.width = 800;
        this.height = 500;
        this.margin = {
            top: 20,
            left: 20,
            bottom: 20,
            right: 20
        };
        this.barColors = ['red', 'cyan', 'darkgreen', 'beige', 'brown', 'yellow'];

        d3.select('body')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('class', 'chart');

        this.scaleX = d3.scaleBand().range([(this.margin.left), (this.width - this.margin.right)]);
        this.scaleY = d3.scaleLinear().range([(this.height - this.margin.bottom), (this.margin.top)]);
        this.scaleBarColors = d3.scaleOrdinal().range(this.barColors);
    }

    render() {
        console.log("Rendering a grouped bar graph");
        d3.csv('/resources/age_group_data.csv', (row, index, columns) => {
            columns.forEach((column) => {
                if (column !== 'State') row[column] = +row[column];
            });

            return row;
        }, (data) => {
            let dataColumns = data.columns.slice(1);
            let containerHeight = this.height - this.margin.bottom - this.margin.top;
            let containerWidth = this.width - this.margin.left - this.margin.right;

            let g = d3.select('svg')
                .append('g')
                .attr('width', containerWidth)
                .attr('height', containerHeight);

            // Set the domain for the scales.
            this.scaleX.domain(data.map((row) => row[data.columns[0]]));
            this.scaleY.domain([0, d3.max(data, (row) => {
                return d3.max(dataColumns, (col) => {
                    return row[col];
                });
            })]);
            this.scaleBar = d3.scaleBand().range([0, this.scaleX.bandwidth()]).domain(dataColumns);
            this.scaleBarColors.domain(dataColumns);

            // Join the elements with the data
            let barGroup = g.selectAll('g')
                .data(data)
                .enter()
                .append('g')
                .attr('transform', (row) => {
                    return `translate(${this.scaleX(row.State)}, 0)`;
                })
                .selectAll('rect')
                .data((row) => {
                    return dataColumns.map((col) => {
                        return {
                            col,
                            'value': row[col]
                        };
                    });
                })
                .enter()
                .append('rect')
                .attr('x', (ageGroup) => {
                    return this.scaleBar(ageGroup.col);
                })
                .attr('y', (ageGroup) => {
                    return this.scaleY(ageGroup.value);
                })
                .attr('height', (ageGroup) => {
                    return containerHeight - this.scaleY(ageGroup.value);
                })
                .attr('width', (ageGroup) => {
                    return this.scaleBar.bandwidth();
                })
                .attr('fill', (ageGroup) => {
                    return this.scaleBarColors(ageGroup.col);
                });

        })
    }
}

export default GroupedBar;