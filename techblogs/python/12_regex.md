---
permalink: /techblogs/python/regular-expressions
topic: regular-expressions
---



# Regular Expressions in Python

### Introduction

###### What is Regex ?

- A RegEx, or Regular Expression, is a sequence of characters that forms a search pattern.
- RegEx can be used to check if a string contains the specified search pattern.

###### Python module

```python
import re 
```



**Example:**

```python
import re

txt = "The rain in Spain"
x = re.search("^The.*Spain$", txt) 
# Search the string to see if it starts with "The" and ends with "Spain"
```



### RegEx Functions

| Function    | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| [findall]() | Returns a list containing all matches                        |
| [search]()  | Returns a [Match object]() if there is a match anywhere in the string |
| [split]()   | Returns a list where the string has been split at each match |
| [sub]()     | Replaces one or many matches with a string                   |



### Metacharacters

Metacharacters are characters with a special meaning.

| Character | Description                                                  | Example        |
| --------- | ------------------------------------------------------------ | -------------- |
| []        | A set of characters                                          | "[a-m]"        |
| \         | Signals a special sequence (can also be used to escape special characters) | "\d"           |
| .         | Any character (except newline character)                     | "he..o"        |
| ^         | Starts with                                                  | "^hello"       |
| $         | Ends with                                                    | "world$"       |
| *         | Zero or more occurrences                                     | "aix*"         |
| +         | One or more occurrences                                      | "aix+"         |
| {}        | Exactly the specified number of occurrences                  | "al{2}"        |
| \|        | Either or                                                    | "falls\|stays" |
| ()        | Capture and group                                            |                |



### Special Sequences

A special sequence is a `\` followed by one of the characters in the list below, and has a special meaning:

| Character | Description                                                  | Example           |
| --------- | ------------------------------------------------------------ | ----------------- |
| \A        | Returns a match if the specified characters are at the beginning of the  string | "\AThe"           |
| \b        | Returns a match where the specified characters are at the beginning or at the  end of a word | r"\bain" r"ain\b" |
| \B        | Returns a match where the specified characters are present, but NOT at the beginning  (or at  the end) of a word | r"\Bain" r"ain\B" |
| \d        | Returns a match where the string contains digits (numbers from 0-9) | "\d"              |
| \D        | Returns a match where the string DOES NOT contain digits     | "\D"              |
| \s        | Returns a match where the string contains a white space character | "\s"              |
| \S        | Returns a match where the string DOES NOT contain a white space character | "\S"              |
| \w        | Returns a match where the string contains any word characters (characters from  a to Z, digits from 0-9, and the underscore _ character) | "\w"              |
| \W        | Returns a match where the string DOES NOT contain any word characters | "\W"              |
| \Z        | Returns a match if the specified characters are at the end of the string | "Spain\Z"         |



### Sets

A set is a set of characters inside a pair of square brackets ` []` with a special meaning:

| Set         | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| [arn]       | Returns a match where one of the specified characters (`a`, `r`, or `n`) are  present |
| [a-n]       | Returns a match for any lower case character, alphabetically between `a` and `n` |
| [^arn]      | Returns a match for any character EXCEPT `a`, `r`, and `n`   |
| [0123]      | Returns a match where any of the specified digits (`0`, `1`, `2`, or ` 3`) are  present |
| [0-9]       | Returns a match for any digit between `0` and `9`            |
| [0-5]\[0-9] | Returns a match for any two-digit numbers from `00` and ` 59` |
| [a-zA-Z]    | Returns a match for any character alphabetically between `a` and `z`, lower case OR upper case |
| [+]         | In sets, `+`, `*`, `.`, `|`, `()`, `$`,`{}`  has no special meaning, so `[+]` means: return a match for any `+` character in the string |



## RegEx Methods

##### findall(regex, txt)

The `findall()` function returns a list containing all matches.



**Example:**

Print a list of all matches:

```python
import re

txt = "The rain in Spain"
x = re.findall("ai",   txt)
print(x)
```

- The list contains the matches in the order they are found.

- If no matches are found, an empty list is returned:



##### search(regex, txt)

- The `search()` function searches the string  for a match, and returns a [Match object]() if there is a  match.

- If there is more than one match,  only the first occurrence of the match will be returned:



**Example:**

Search for the first white-space character in the string:

```python
import re

txt = "The rain in Spain"
x = re.search("\s",   txt)
print("The first white-space character is located in   position:", x.start())
```

- If no matches are found, the value `None` is returned:

 

##### split(regex, txt)

- The `split()` function returns a list where  the string has been split at each match:



**Example-1:**

Split at each white-space character:

```python
import re

txt = "The rain in Spain"
x = re.split("\s", txt)
print(x) 
```

You can control the number of occurrences by specifying the  `maxsplit`  parameter:



**Example-2:**

Split the string only at the first occurrence:

```python
import re

txt = "The rain in Spain"
x = re.split("\s", txt, 1)
print(x) 
```

 

##### sub(regex, replacement, txt)

The `sub()` function replaces the matches with  the text of your choice:



**Example-1:**

Replace every white-space character with the number 9:

```python
import re

txt = "The rain in Spain"
x = re.sub("\s",   "9", txt)
print(x) 
```



> We can control the number of replacements by specifying the `count`  parameter:

**Example-2:**

Replace the first 2 occurrences:

```python
import re

txt = "The rain in Spain"
x = re.sub("\s",   "9",  txt,  2)
print(x) 
```

## Match Object

- A Match Object is an object containing information  about the search and the result.
- If there is no match, the value `None` will be  returned, instead of the Match Object.



**Example-1:**

Do a search that will return a Match Object:

```python
import re

txt = "The rain in Spain"
x = re.search("ai",   txt)
print(x) #this will print an object 
```



The Match object has properties and methods used to retrieve information  about the search, and the result:

- [`.span()`]() returns a tuple containing the start-, and end positions of the match.
- [`.string`]() returns the string passed into the function
- [`.group()`]() returns the part of the string where there was a match



**Example-1:**

Print the position (start- and end-position) of the first match occurrence.

The regular expression looks for any words that starts with an upper case   "S":

```python
import re

txt = "The rain in Spain"
x = re.search(r"\bS\w+", txt)
print(x.span()) 
```



**Example-2:**

Print the string passed into the function:

```python
import re

txt = "The rain in Spain"
x = re.search(r"\bS\w+", txt)
print(x.string) 
```



**Example-3:**

Print the part of the string where there was a match.

The regular expression looks for any words that starts with an upper case   "S":

```python
import re

txt = "The rain in Spain"
x = re.search(r"\bS\w+", txt)
print(x.group()) 
```

**Note:** If there is no match, the value `None` will be  returned, instead of the Match Object.





---

