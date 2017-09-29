package com.nikhil.streams;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.partitioningBy;

public class Collections {

    @Data
    @AllArgsConstructor
    @RequiredArgsConstructor
    public static class Person {

        @NonNull
        private String name;
        @NonNull
        private int age;

        private String nationality;

    }

    public static String namesAsString(List<Person> people) {
        return people.stream().map(Person::getName).collect(Collectors.joining(", ", "Names: ", "."));
    }

    public static Map<String, List<Person>> groupByNationality(List<Person> people) {
        return people.stream().collect(Collectors.groupingBy(Person::getNationality));
    }

    public static Map<Boolean, List<Person>> partitionList(List<Person> people) {
        return people.stream().collect(partitioningBy(p -> p.getAge() > 10));
    }

    public static Person oldestPerson(List<Person> people) {
        return people.stream().max(Comparator.comparingInt(Person::getAge)).get();
    }

    public static int sumList(List<Integer> list) {
        return list.stream().reduce(0, (a, b) -> a + b);
    }

    public static List<String> flattenMap(List<List<String>> listOfLists) {
        return listOfLists.stream().flatMap(l -> l.stream()).collect(Collectors.toList());
    }

    public static List<String> toUpperCase(List<String> lowerCase) {
        return lowerCase.stream().map(e -> e.toUpperCase()).collect(Collectors.toList());
    }

    public static List<String> filter(List<String> list) {
        return list.stream().filter(s -> s != "is").collect(Collectors.toList());
    }
}
