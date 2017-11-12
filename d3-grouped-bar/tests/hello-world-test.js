let tape = require('tape');
let jsdom = require('jsdom');

tape("Hello World", (test) => {
    test.plan(1);

    let actual = "Hello World";
    test.equal(actual, 'Hello World', "Expecting hello world");
});