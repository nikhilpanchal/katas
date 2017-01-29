package com.nikhil.apps.katas.stringcalculator;

/**
 * Created by nikhilpanchal on 1/29/17.
 */
public class Calculator {

    public static final String DELIMITER = ",";

    public int add(String s) {
        int sum = 0;

        if (s == "" || s.length() == 0 || s == null) {
            return 0;
        }

        // Split up the string into its individual numbers
        String[] numbers = s.split(DELIMITER);

        // Add the separated numbers.
        for (String number : numbers) {
            sum += Integer.parseInt(number);
        }

        return sum;
    }
}
