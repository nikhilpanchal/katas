package com.nikhil.apps.katas.stringcalculator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Created by nikhilpanchal on 1/29/17.
 */
public class CalculatorTest {
    private Calculator calculator;

    @BeforeEach
    public void setUp() {
        calculator = new Calculator();
    }

    @Test
    public void foranemptystring_itShouldGiveBackZero() {
        assertEquals(0, calculator.add(""));
    }

    @Test
    public void forAStringWithOneNumber_itShouldReturnBackTheNumberAsAnInteger() {
        int result = calculator.add("2");

        assertEquals(2, result);
    }

    @Test
    public void forAStringWithTwoNumbers_itShouldReturnBackTheSum() {
        int result = calculator.add("2,3");

        assertEquals(5, result);
    }

    @Test
    public void forAStringWithThreeNumbers_itShouldReturnBackTheSum() {
        int result = calculator.add("4,5,6");

        assertEquals(15, result);
    }

}
