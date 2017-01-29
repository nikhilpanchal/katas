# String Calculator

This is a kata to write a string calculator function that takes in a delimited set of numbers as a string and returns 
 back the sum of these numbers. So the function needs to parse out the numbers from the input string, convert them to 
 integers and return back the sum.
 
This is something that appears fairly simple at first, but can get complicated once you put in edge cases like the 
following

 - Take in an arbitrary length of numbers
 - Numbers can be delimited by an arbitrary character, even new lines
 
The one thing that this function doesn't need to do is validate the input string: It can assume the string is a legal 
delimited set of numbers.