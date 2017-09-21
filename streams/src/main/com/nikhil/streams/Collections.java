package com.nikhil.streams;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class Collections {

    public static class Person {
        public String name;
        public int age;

        public Person(String name, int age) {
            this.name = name;
            this.age = age;
        }

        public int getAge() {
            return this.age;
        }
    }

    public static Person oldestPerson(List<Person> people) {
        return people.stream().max(Comparator.comparingInt(Person::getAge)).get();
    }

    public static int sumList(List<Integer> list) {
        return list.stream().reduce(0, (a, b) -> a+b);
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
