
function calculate(str, operator) {
    let operatorIndex = str.indexOf(operator)

    let operand1 = str.substr(0, operatorIndex)
    let operand2 = str.substr(operatorIndex + 1)

    switch (operator) {
        case "+": return parseInt(operand1, 10) + parseInt(operand2, 10)
        case "*": return parseInt(operand1, 10) * parseInt(operand2, 10)
        case "/": return parseInt(operand1, 10) / parseInt(operand2, 10)
        case "-": return parseInt(operand1, 10) - parseInt(operand2, 10)
    }
}

// To be refactored

function parse(str) {
    if(str.indexOf("+") > 0) {
        return calculate(str, "+")
    } else if(str.indexOf("*") > 0) {
        return calculate(str, "*")
    } else if(str.indexOf("-") > 0) {
        return calculate(str, "-")
    } else if(str.indexOf("/") > 0) {
        return calculate(str, "/")
    }

    return parseInt(str, 10)
}

module.exports = {
    parse
}
