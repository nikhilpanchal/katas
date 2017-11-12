let tape = require('tape');
let jsdom = require('./jsdom');

import GroupedBar from '../src/charts/grouped-bar';


tape("D3 Grouped Bar Chart", (test) => {
    // Will not finish the test until 3 assertions have been run.
    // test.plan(5);
    let document = global.document = new jsdom("<div class='content'></div>");
    let groupedBar = new GroupedBar();

    let svg = document.querySelector('svg');

    test.ok(svg, "Grouped bar should create its own svg element within the .content div");
    test.equal(svg.getAttribute('height'), '500', "SVG height should be 500");
    test.equal(svg.getAttribute('width'), '800', "SVG width should be 800");

    let request = groupedBar.render('file:resources/age_group_data.csv');

    request.on('load.tests', (e) => {
        // event listener that will get fired after the data has been loaded
        // d3.csv fortunately calls this listener after its own registered callback
        let barGroups = document.querySelectorAll('.bargroup');

        test.equal(barGroups.length, 6, '6 bar groups');

        let firstBarGroup = barGroups[0];
        test.equal(firstBarGroup.childElementCount, 7, '7 children in each bar group');

        firstBarGroup.childNodes.forEach((childNode, i) => {
            test.equal(childNode.tagName, 'rect', `Child ${i} of bar group should be a rectangle`);
        });

        test.ok(document.querySelector('.xaxis'), "Should draw the x-axss");
        test.ok(document.querySelector('.yaxis'), "Should draw the y-axss");

        let legend = document.querySelector('.legend');
        test.ok(legend, 'Should draw the legend to be drawn');

        test.end();
    });
});