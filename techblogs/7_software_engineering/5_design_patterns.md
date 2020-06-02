# Design Patterns

###### What are Design Patterns ?

- Design patterns are used to represent the pattern used by developers to create software or web application.

- These patterns are selected based on the requirement analysis.

- The patterns describe the solution to the problem, when and where to apply the solution and the consequences of the implementation.

#### Structure

<img src="assets/design_pattern_structure_1.png" width="60%">



#### Python Design Patterns

Python provides support for variety of design patterns:

- Model View Controller Pattern
- Singleton pattern
- Factory pattern
- Builder Pattern
- Prototype Pattern
- Facade Pattern
- Command Pattern
- Adapter Pattern
- Prototype Pattern
- Decorator Pattern
- Proxy Pattern
- Chain of Responsibility Pattern
- Observer Pattern
- State Pattern
- Strategy Pattern
- Template Pattern
- Flyweight Pattern
- Abstract Factory Pattern
- Object Oriented Pattern



#### Benefits of using design pattern

- Patterns provide developer a selection of tried and tested solutions for the specified problems.
- All design patterns are language neutral.
- Patterns help to achieve communication and maintain well documentation.
- It includes a record of accomplishment to reduce any technical risk to the project.
- Design patterns are highly flexible to use and easy to understand.





### Some Common Design Patterns

## 1. Singleton pattern

- This pattern restricts the instantiation of a class to one object.
- It is a type of creational pattern and involves only one class to create methods and specified objects.
- It provides a global point of access to the instance created.

<img src="assets/singelton_pattern.png" width="25%">



###### Implementation

```python
class Singleton:
   __instance = None
    
   @staticmethod 
   def getInstance():
      """ Static access method. """
      if Singleton.__instance == None:
         Singleton()
      return Singleton.__instance
    
   def __init__(self):
      """ Virtually private constructor. """
      if Singleton.__instance != None:
         raise Exception("This class is a singleton!")
      else:
         Singleton.__instance = self
          

s = Singleton()
print(s)
s = Singleton.getInstance()
print(s)
s = Singleton.getInstance()
print(s)
```





## 2. Factory Pattern

- The factory pattern comes under the creational patterns list category.
- It provides one of the best ways to create an object. In factory pattern, objects are created without exposing the logic to client and referring to the newly created object using a common interface.
- Factory patterns are implemented in Python using factory method.
- When a user calls a method such that we pass in a string and the return value as a new object is implemented through factory method.
- The type of object used in factory method is determined by string which is passed through method.
- In the example below, every method includes object as a parameter, which is implemented through factory method.

###### Implementation:

```python
class Button(object):
   html = ""
   def get_html(self):
      return self.html

class Image(Button):
   html = "<img></img>"

class Input(Button):
   html = "<input></input>"

class Flash(Button):
   html = "<obj></obj>"

class ButtonFactory():
   def create_button(self, typ):
      targetclass = typ.capitalize()
      return globals()[targetclass]()

    
button_obj = ButtonFactory()
buttons = ['image', 'input', 'flash']
for b in buttons:
   print button_obj.create_button(b).get_html()
```

##### Notes:

- The button class helps to create the html tags and the associated html page.
- The client will not have access to the logic of code and the output represents the creation of html page.



---























