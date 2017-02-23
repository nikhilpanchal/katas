var OP_RANK = {
    '*': 0,
    '/': 1,
    '+': 2,
    '-': 2
}

function calculateOperation(lOperand, rOperand, operator) {
    // Potentially use the strategy pattern for this.

    // parseInt for lop and rop could have been done once been more dry.
    switch (operator) {
        case "+":
            return parseInt(lOperand, 10) + parseInt(rOperand, 10);
        case "*":
            return parseInt(lOperand, 10) * parseInt(rOperand, 10);
        case "/":
            return parseInt(lOperand, 10) / parseInt(rOperand, 10);
        case "-":
            return parseInt(lOperand, 10) - parseInt(rOperand, 10);
    }
}

function findOpIndex(str) {
    let opIndex = [],
        operators = ['+', '-', '*', '/'];;

    for (let index in operators) {
        opIndex.push(str.lastIndexOf(operators[index]));
    }

    // The index of the rightmost operator in str
    return Math.max(...opIndex);
}


function isCurrentOpHigherThanPrevious(current, previous) {
    return (OP_RANK[current] < OP_RANK[previous]);
}

function calculateRecursive(str) {
    let opIndex = findOpIndex(str);
    let lOperand, rOperand, operator;

    // Single number expressions.
    if (opIndex === -1) {
        return parseInt(str, 10);
    }

    let previousOpIndex = findOpIndex(str.substr(0, opIndex));
    // Multiple operation expressions.
    if (previousOpIndex > 0 &&
        isCurrentOpHigherThanPrevious(str.charAt(opIndex), str.charAt(previousOpIndex))) {
        // the str.charAts could have been done earlier and saved in their own variables
        // or in its own function, which would make the if much more concise.
        let higherOrderOp = str.substr(previousOpIndex+1, opIndex);

        rOperand = calculateRecursive(higherOrderOp);
        opIndex = previousOpIndex;
    } else {
        // Single operation expressions or multi-ones where the previous op is not higher
        // order than the current one.
        rOperand = str.substr(opIndex+1);
    }

    operator = str.charAt(opIndex);
    lOperand = calculateRecursive(str.substr(0, opIndex));


    return calculateOperation(lOperand, rOperand, operator);
}


function parse(str) {
    return calculateRecursive(str);
}

module.exports = parse;
