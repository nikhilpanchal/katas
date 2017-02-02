

const { parse } = require("../src/parser")

describe("Simple test", function () {
    it("Should return a parsed number when the number is provided as an arg", function () {
        expect(parse("1")).toEqual(1)
    })

    it("Should add two numbers are return the integer result", function () {
        expect(parse("1+1")).toEqual(2)
    });

    it("Should add two different numbers", function () {
        expect(parse("1+3")).toEqual(4)
    })

    it("Should multiple two numbers", function () {
        expect(parse("2*4")).toEqual(8)
    })

    it("Should subtract two numbers", function () {
        expect(parse("6-3")).toEqual(3)
    })

    it("Should divide two numbers", function () {
        expect(parse("10/5")).toEqual(2)
    })
})


