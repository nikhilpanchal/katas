package com.nikhil.streams;

import org.hamcrest.Matchers;
import org.junit.Test;

import java.util.List;
import java.util.Map;

import static com.nikhil.streams.Collections.*;
import static java.util.Arrays.asList;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;

public class CollectionsTests {

    @Test
    public void givenACollectionOfIntegers_ShouldReturnItsSum() {
        List<Integer> list = asList(1, 2, 3, 4, 5, 6);

        int sum = Collections.sumList(list);

        assertThat(sum, is(equalTo(21)));
    }

    @Test
    public void givenACollectionOfPersons_ShouldReturnTheOldest() {
        Person aiden = new Person("Aiden", 6);
        Person erica = new Person("Erica", 38);
        Person nikhil = new Person("Nikhil", 39);

        List<Person> people = asList(aiden, erica, nikhil);

        Person oldest = Collections.oldestPerson(people);

        assertThat(oldest, is(nikhil));
    }

    @Test
    public void forAListOfLists_ShouldGiveBackAFlattenedList() {
        List<List<String>> listOfLists = asList(asList("Nikhil", "Panchal"), asList("Erica", "Panchal"));

        List<String> flattenedList = flattenMap(listOfLists);

        assertThat(flattenedList, is(asList("Nikhil", "Panchal", "Erica", "Panchal")));
    }

    @Test
    public void GivenACollectionWithElements_ItShouldFilterOutIs() {
        List<String> list = asList("This", "is", "a", "string");

        List <String> filteredList = filter(list);

        assertThat(filteredList, is(asList("This", "a", "string")));
    }

    @Test
    public void givenACollectionOfCharacters_thenConvertThemToUpperCase() {
        List<String> lowerCase = asList("This", "is", "a", "test", "string");

        List<String> upperCase = toUpperCase(lowerCase);

        assertThat(upperCase, is(asList("THIS", "IS", "A", "TEST", "STRING")));
    }

    @Test
    public void givenACollection_ShouldPartitionBasedOnAge() {
        Person dad = new Person("Nikhil",39);
        Person mom = new Person("Erica", 38);
        Person son = new Person("Aiden", 6);

        List<Person> people = asList(dad, mom, son);

        Map<Boolean, List<Person>> partition = Collections.partitionList(people);

        assertThat(partition.get(true), containsInAnyOrder(dad, mom));
        assertThat(partition.get(false), is(asList(son)));
    }

    @Test
    public void givenACollectionOfPeople_ShouldGroupThemByNationality() {
        Person dad = new Person("Nikhil",39, "Indian");
        Person mom = new Person("Erica", 38, "Indian");
        Person son = new Person("Aiden", 6, "American");

        Map<String, List<Person>> groupedPeople = groupByNationality(asList(dad, mom, son));

        assertThat(groupedPeople.get("Indian"), containsInAnyOrder(dad, mom));
        assertThat(groupedPeople.get("American"), equalTo(asList(son)));
    }

    @Test
    public void givenACollectionOfPeople_ShouldReturnAStringOfTheirNames() {
        Person dad = new Person("Nikhil",39, "Indian");
        Person mom = new Person("Erica", 38, "Indian");
        Person son = new Person("Aiden", 6, "American");

        String namesAsString = namesAsString(asList(dad, mom, son));

        assertThat(namesAsString, equalTo("Names: Nikhil, Erica, Aiden."));

    }
}
