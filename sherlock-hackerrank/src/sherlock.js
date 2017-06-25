/**
 * Created by nikhilpanchal on 6/25/17.
 */
'use strict';

var assert = require('assert');


function ElemAndDiff(element, delta) {
    this.element = element;
    this.delta = delta;
}
ElemAndDiff.prototype.toString = function() {
    return `Element: ${this.element} Delta: ${this.delta}`;
}

function getInputDeltas(sortedInput) {
    return sortedInput.map((val, index) => {
        if (index === sortedInput.length-1) {
            return new ElemAndDiff(val, 0);
        }

        return new ElemAndDiff(val, sortedInput[index+1] - val);
    }).sort((a, b) => {
        return (a.delta - b.delta);
    });
}

function isElementInRange(element, rangeFloor, rangeCeiling) {
    return (rangeFloor <= element && element <= rangeCeiling);
}

function processData(inputData, range) {
    let sortedInput = inputData.sort((a, b) => (a-b));
    //console.log(`Input ${sortedInput}`);
    //console.log(`Range Floor: ${range[0]}, Range Ceiling ${range[1]}`);

    // Range is numerically to the left of input
    if (range[1] <= sortedInput[0]) {
        return range[0];
    }

    // Range is numerically to the right of input
    if (range[0] >= sortedInput[sortedInput.length-1]) {
        return range[1];
    }

    // Range numerically overlaps from the left.
    let maxMinDiff = 0;
    let maxMinDiffElement = 0;
    if ((range[0] <= sortedInput[0])) {
        maxMinDiff = sortedInput[0] - range[0];
        maxMinDiffElement = range[0];

        if ((sortedInput[0] + maxMinDiff) > range[1]) {
            return range[0];
        }

        // Update the range left bound.
        range[0] = sortedInput[0] + maxMinDiff;
    }

    // Range numerically overlaps from the right.
    let inputLength = sortedInput.length-1
    if (range[1] >= sortedInput[inputLength]) {
        let rightDiff = range[1] - sortedInput[inputLength];

        if(rightDiff > maxMinDiff) {
            maxMinDiff = rightDiff;
            maxMinDiffElement = range[1];
        }

        if ((sortedInput[inputLength] - maxMinDiff) < range[0]) {
            return range[1];
        }

        // Update the range right bound.
        range[1] = sortedInput[inputLength] - maxMinDiff;
    }



//    console.log(`Range Floor: ${range[0]}, Range Ceiling ${range[1]}`);
    //  console.log(`MaxMinDiffElement ${maxMinDiffElement} MaxMinDiff ${maxMinDiff}`);

    // Compute the deltas.
    let deltas = getInputDeltas(sortedInput);
    //console.log(`${deltas}`);

    while (deltas.length > 0) {
        let maxDelta = deltas.pop();
        //console.log(`Max Delta ${maxDelta} Max Min Diff ${maxMinDiff}`);

        let possibleDiff = Math.trunc(maxDelta.delta / 2);
        let elem = possibleDiff + maxDelta.element;
        //console.log(`Potential Element ${elem} Possible Diff ${possibleDiff}`);

        if ((possibleDiff < maxMinDiff)) {
            // The maximum potential diff is < than the one we have so use the one we have and stop.
            break;
        }

        if((possibleDiff === maxMinDiff) && (maxMinDiffElement < elem)) {
            break;
        }

        if (isElementInRange(elem, range[0], range[1])) {
            maxMinDiffElement = elem;
            //console.log(`Element ${elem} in range, use it`);
            break;
        } else {
            if ((maxDelta.element > range[0]) && ((range[1] - maxDelta.element) > maxMinDiff)) {
//                console.log(`Right Tail Diff: ${range[1] - maxDelta.element} MaxMinDiff ${maxMinDiff}`);

                maxMinDiff = range[1] - maxDelta.element;
                maxMinDiffElement = range[1];
            }
        }
    }

    //console.log(`${maxMinDiffElement} answer`);
    return maxMinDiffElement;
}


// Test case for when the range is numerically to the left of input
assert.equal(processData([4,8,12,30], [1,3]), 1, "Should return the rightmost element of range when it is numerically to the left of input");

// Test case for when the range is numerically to the right of input
assert.equal(processData([9,20,45,69], [70,100]), 100, "Should return the leftmost element of range when it is numerically to the right of input");

// Test case for when the range is numerically overlapping from the left
assert.equal(processData([45,47,50,52,54,57], [40,54]), 40, "Should return smallest element in range with the maximum minimum difference");

assert.equal(processData([5,8,14], [4,9]), 4, "Should return the smallest element of the maximum difference");

assert.equal(processData([45,47,48,59,64,70], [41,55]), 53, "Should return the element with the maximum minimum difference");

assert.equal(processData([45,47,48,59,72,74,80], [41,68]), 65, "Should return the element with the maximum minimum difference");


assert.equal(processData([45,47,48,59,72,74,80], [41,64]), 53, "Should return the element with the maximum minimum difference");


assert.equal(processData([45,47,48,59,72,84,90], [41,84]), 65, "Should return the element with the maximum minimum difference");


// Test case for when the range is numerically overlapping from the right
assert.equal(processData([30, 38, 48, 50, 60], [23, 69]), 69, "Should return the maximum minimum difference");


assert.equal(processData([10, 12, 24, 40, 50], [9,16]), 16, "Should return the maximum minimum difference");


assert.equal(processData([58,124,284,300,368,604,626,772,1014,1542,1662,1700,2330,2402,2416,2540,2666,3018,3268,3444,3576,3746,4160,4224,4292,4354,4404,4552,4922,4924,5068,5224,5462,5528,5812,5996,6088,6132,6468,6672,6738,7180,7184,7230,7268,7362,7414,7436,7616,7764], [2518, 4111]), 3953, "Should return the maximum minimum difference");


assert.equal(processData([635179944,592614358,645156538,601132234,72927588,782907998,26680576,571904512,253411364,368495632,668408894,715988190,473032290,221000496,166917988,579752154,157507364,169860230,693307354,154889188,598650762,721921752,691564182,40331570,680814954,699857994,283203518,248907756,42917082,510182506,103334006,659157584,68613710,41025968,514681540,388857390,732578568,312342822,544403214,414550896,401504698,342138612,578598706,455969120,673917170,671475360,622813896,327454610,742037798,192108990,115056746,453856008,67302432,568454084,178080688,624229470,47759236,7828940,554075052,636698586,56519734,254355714,149844386,684772334,714305610,572611200,740611006,350803732,625347950,27623254,429722502,772950450,508854614,18633596,529333176,635794634,102605328,122897004,595455366,105384508,220658676,370461750,782829740,371224392,595323626,302478768,448101966,213876262,477578452,724776600,623913570,456079206,284937928,441662568,21517112,446207966,467159802,620366990,178426646,130044896], [64214888, 789945206]), 493216533, "Should return the smallest");


process.stdin.resume();
process.stdin.setEncoding("ascii");
var _input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
    let inputs = _input.split('\n');

    let count = +inputs[0];
    let inputData = inputs[1].split(' ').map((d) => +d);
    let range = inputs[2].split(' ').map((d) => +d);

    let answer = processData(inputData, range);
    console.log(answer);
});


