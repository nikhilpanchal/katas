const parse = require("../src/parser");

describe("Simple test", function () {
    it("Should return a parsed number when the number is provided as an arg", function () {
        expect(parse("1")).toEqual(1)
    });

    it("Should add two numbers are return the integer result", function () {
        expect(parse("1+1")).toEqual(2)
    });

    it("Should add two different numbers", function () {
        expect(parse("1+3")).toEqual(4)
    });

    it("Should multiple two numbers", function () {
        expect(parse("2*4")).toEqual(8)
    });

    it("Should subtract two numbers", function () {
        expect(parse("6-3")).toEqual(3)
    });

    it("Should divide two numbers", function () {
        expect(parse("10/5")).toEqual(2)
    });

    it("Should work with multi-digit numbers", function () {
        expect(parse("100+200")).toEqual(300);
    })
});

describe("Multiple operations", () => {
    it("Should calculate the result of two additions", () => {
        expect(parse("1+2+3")).toEqual(6);
    });

    it("Should calculate the result of two subtractions", () => {
        expect(parse("7-2-3")).toEqual(2);
    });

    it("Should calculate the result for addition and subtraction", () => {
        expect(parse("1+2-3")).toEqual(0);
    });

    it("Should calculate multiple multiplications", () => {
        expect(parse("2*4*3")).toEqual(24);
    });
});

describe("Operator precedence", () => {
    it("Should calculate multiple multiplications and divisions", () => {
        expect(parse("8*2/4")).toEqual(4);
    });

    it("Should calculate multiplications before additions", () => {
        expect(parse("2+3*4")).toEqual(14);
    });

    it("Should fill in higher order ops values before doing the lower ones", () => {
        expect(parse("4+5*2+4*2+1")).toEqual(23);
    });
});

describe("Should work with double digit numbers", () => {
    it("Should handle single operations", () => {
        expect(parse("100+200")).toEqual(300);
    });

    it("Should handle multiple operations", () => {
        expect(parse("100+300-200")).toEqual(200);
    });

    it("Should take operator precedence into account", () => {
        expect(parse("100+200*300+200*500")).toEqual(160100);
    })
});