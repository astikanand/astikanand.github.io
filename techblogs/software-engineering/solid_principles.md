---
permalink: /techblogs/software-engineering/solid-principles
topic: solid-principles
---



# S.O.L.I.D Principles

###### What are SOLID Principles ?

- First conceptualized by **Robert C. Martin** in **2000** and later built upon by **Michael Feathers**.
- In last 20 years, these 5 principles have revolutionized the world of object-oriented programming, changing the way we write software.
- It encourages us to create more **maintainable**, **understandable**, and **flexible** software.
- Consequently, as our applications grow in size, we can reduce their complexity and save ourselves a lot of headaches later.

###### 5 Concepts that make up the SOLID principles.

1. ***S***ingle Responsibility
2. ***O***pen - Closed
3. ***L***iskov Substitution
4. ***I***nterface Segregation
5. ***D***ependency Inversion

<br>

## 1. *S*ingle Responsibility Principle (SRP)

***A class should have only one responsibility and It should only have one reason to change.***

> When designing our classes, we should aim to put  related features together, so whenever they tend to change they change  for the same reason. And we should try to separate features if they will change for different reasons. ---- **Steve Fenton**

###### How does this principle help us to build better software ?

- **Testing –** A class with one responsibility will have far fewer test cases.
- **Lower coupling –** Less functionality in a single class will have fewer dependencies.
- **Organization –** Smaller, well-organized classes are easier to search than monolithic ones.

<br>

[Note :-]() This principle applies not only to classes, but also to software components and microservices.

<br>

**Example:**

```c#
class Animal {
    constructor(name: string){ }
    getAnimalName() { }
    saveAnimal(a: Animal) { }
}
```

###### How does this Animal Class violate SRP ?

- Here, we can see that class has 2 responsibilities:
  1. Animal Properties Management :- constructor and getAnimalName manage the Animal properties
  2. Animal Database Management :- saveAnimal manages the Animal storage on a database

###### How will this design cause issues in the future?

- If the application changes in a way that it affects database management functions.
- The classes that make use of Animal properties will have to be touched and recompiled to compensate for the new changes.
- System smells of **rigidity**, it’s like a domino effect, touch one card it affects all other cards in line

###### To make this conform to SRP, create another class to handle the sole responsibility of storing an animal to a database.

```c#
class Animal {
    constructor(name: string){ }
    getAnimalName() { }
}

class AnimalDB {
    getAnimal(a: Animal) { }
    saveAnimal(a: Animal) { }
}
```

###### How to validate the design ?

- If we build the software over a longer period and need to adapt it to changing requirements.
- Adding a method or functionality to the existing code instead of writing a new class or component might seem like the easiest and fastest approach.
- But that often results in classes with more than responsibility and makes it more and more difficult to maintain the software.
- We can avoid these problems by asking a simple question before making any changes.
- [What is the responsibility of the class/component/microservice ?]()
  - If the answer includes the word **"and"**, we are most likely breaking the single responsibility principle.
  - Then it’s better to take a step back and rethink the current approach.
  - There is most likely a better way to implement it.

- With the proper application of these, our application becomes **highly cohesive**.

<br>

## 2. *O*pen-Closed Principle (OCP)

***Software entities(Classes, modules, functions) should be open for extension but not for modification.***

> This principle is the foundation for building code that is maintainable and reusable. ---- **Robert C. Martin**

###### How can something be open and closed ?

- A class follows the OCP if it fulfills these two criteria:
  1. [Open for extension :]() This ensures that the class behavior can be extended. As requirements change, we should be able to make a class behave in new and different ways, to meet the needs of the new requirements.
  2. [Closed for modification :]() The source code of such a class is set in stone, no one is allowed to make changes to the code.

<br>

**Example:**

- Let’s imagine we have a store, and we give a discount of 20% to our favorite customers using this class:

```c#
class Discount {
    getDiscount() {
        return this.price * 0.2
    }
}
```

- When we decide to offer double the 20% discount to VIP customers. We may modify the class like this:

```c#
class Discount {
    getDiscount() {
        if(this.customer == 'fav') {
            return this.price * 0.2;
        }
        if(this.customer == 'vip') {
            return this.price * 0.4;
        }
    }
}
```

###### How the above class fails OCP ?

- If we want to give a new percent discount maybe, to a diff. type of customers, a new logic will be added.

###### To make it follow the OCP principle, we will add a new classes that will  extend the Discount and implement its new  behavior.

```c#
class VIPDiscount: Discount {
    getDiscount() {
        return super.getDiscount() * 2;
    }
}

class SuperVIPDiscount: VIPDiscount {
    getDiscount() {
        return super.getDiscount() * 2;
    }
}
```

- Here we see extension without modification.

###### How do we achieve OCP every time ?

- Through abstractions, to be able to extend the behavior of a class without changing a single line of code, we need to make abstractions.
- For example, if we had a system that works with different shapes as classes, we would probably have classes like Circle, Rectangle, etc.
- In order for a class that depends on one of these classes to implement OCP, we need to introduce a Shape interface/class.
- Then, wherever we had Dependency Injection, we would inject a Shape instance instead of an instance of a lower-level class.
- This would give us the luxury of adding new shapes without having to change the dependent classes' source code.

###### How do we know whether to make Shape a class or an interface ?

- For that, we’ve got the Liskov Substitution Principle, which tells us when inheritance is suitable.

<br>

## 3. *L*iskov Substitution Principle (LSP)

***A sub-class must be substitutable for its super-class.***

> What is wanted here is something like the following substitution property: 
>
> If for each object o1 of type S there is an object o2 of type T such that for all programs P defined in terms of T, the behavior of P is unchanged when o1 is substituted for o2 then S is a subtype of T.  ---- **Barbara Liskov**

###### What is LSP ?

- Extends the Open/Closed principle and enables us to replace objects of a parent class with objects of a subclass without breaking app.
- The aim of this principle is to ascertain that a sub-class can assume the place of its super-class without errors.
- If the code finds itself checking the type of class then, it must have violated this principle.

<br>

**Example:-**

```c#
//...
class Pigeon extends Animal {
        
}
const animals[]: Array<Animal> = [
    //...,
    new Pigeon();
]
    
function AnimalLegCount(a: Array<Animal>) {
    for(int i = 0; i <= a.length; i++) {
        if(typeof a[i] == Lion)
            log(LionLegCount(a[i]));
        if(typeof a[i] == Mouse)
            log(MouseLegCount(a[i]));
         if(typeof a[i] == Snake)
            log(SnakeLegCount(a[i]));
        if(typeof a[i] == Pigeon)
            log(PigeonLegCount(a[i]));
    }
}
AnimalLegCount(animals);
```

- This violates the LSP principle, (and also the OCP principle).
- It must know of every Animal type and call the associated leg-counting function.
- With every new creation of an animal, the function must modify to accept the new animal.

###### To make this function follow the LSP principle, follow this LSP requirements postulated by Steve Fenton:

- If the super-class (Animal) has a method that accepts a super-class type (Animal) parameter. Its sub-class(Pigeon) should accept as argument a super-class type (Animal type) or sub-class type(Pigeon type).
- If the super-class returns a super-class type (Animal). Its sub-class should return a super-class type (Animal type) or sub-class type(Pigeon).

```c#
class Animal {
    //...
    LegCount();
}

//...
class Lion extends Animal{
    //...
    LegCount() {
        //...
    }
}
//...

function AnimalLegCount(a: Array<Animal>) {
    for(let i = 0; i <= a.length; i++) {
        a[i].LegCount();
    }
}
AnimalLegCount(animals);
```

**Note :-** The Animal class have to implement or define a LegCount method and its sub-classes have to implement the LegCount method.

<br>

## 4. *I*nterface Segregation Principle (ISP)

***Make fine grained interfaces that are client specific.***

> Clients should not be forced to implement interfaces they do not use.  ---- **Robert C. Martin**

###### What is ISP ?

- This principle deals with the disadvantages of implementing big interfaces.
- At a large scale, microservices are a very similar case, pieces of a system separated by responsibilities, instead of being a great monolith.

<br>

**Example:**

```c#
interface IShape {
    drawCircle();
    drawSquare();
    drawRectangle();
}
```

- This interface draws squares, circles, rectangles.
- Circle, Square or Rectangle class implementing **IShape interface** must define the methods drawCircle(), drawSquare(), drawRectangle().

```c#
class Circle implements IShape {
    drawCircle(){
        //...
    }    drawSquare(){
        //...
    }    drawRectangle(){
        //...
    }    
}
class Square implements IShape {
    drawCircle(){
        //...
    }    drawSquare(){
        //...
    }    drawRectangle(){
        //...
    }    
}
class Rectangle implements IShape {
    drawCircle(){
        //...
    }    drawSquare(){
        //...
    }    drawRectangle(){
        //...
    }    
}
```

- We see that it is impossible to implement a shape that can draw a circle but not a rectangle or a square or a triangle.
- We can just implement the methods to throw an error that shows the operation cannot be performed.
- ISP frowns against the design of this IShape interface.
- Clients (here Rectangle, Circle, and Square) should not be forced to depend on methods that they do not need or use.
- Also, ISP states that interfaces should perform only one job (just like the SRP principle) any extra grouping of behavior should be abstracted away to another interface.

###### To make our IShape interface conform to the ISP principle, we segregate the actions to different interfaces:

```c#
interface IShape {
    draw();
}

interface ICircle {
    drawCircle();
}

interface ISquare {
    drawSquare();
}

interface IRectangle {
    drawRectangle();
}

class Circle implements ICircle {
    drawCircle() {
        //...
    }
}

class Square implements ISquare {
    drawSquare() {
        //...
    }
}

class Rectangle implements IRectangle {
    drawRectangle() {
        //...
    }    
}

class CustomShape implements IShape {
   draw(){
      //...
   }
}
```

[Alternatively:]()

- Classes (Circle, Rectangle, Square, Triangle, etc) can just inherit from the IShape interface and implement their own draw behavior.

```c#
class Circle implements IShape {
    draw(){
        //...
    }
}

class Triangle implements IShape {
    draw(){
        //...
    }
}

class Square implements IShape {
    draw(){
        //...
    }
}

class Rectangle implements IShape {
    draw(){
        //...
    }
}                                            
```

<br>

## 5. *D*ependency Inversion Principle (DIP)

 ***Depend on abstractions, not on concretions.***

> A. High level modules should not depend upon low level modules. Both should depend upon abstractions.
>
> B. Abstractions should not depend upon details. Details should depend upon abstractions.      ---- **Robert C. Martin**

###### What is Dependency Inversion Principle ?

- There comes a point in software development where our app will be largely composed of modules.
- When this happens, we have to clear things up by using dependency injection.
- High-level components depending on low-level components to function.

- Dependency injection is a huge topic and can be as complicated or simple as one might see the need for.
- Typically, dependency injection is used simply by **'injecting'** any dependencies of a class through its constructor as an input parameter.

<br>

**Example:**

```c#
class XMLHttpService extends XMLHttpRequestService {
}

class Http {
    constructor(private xmlhttpService: XMLHttpService) { }
    get(url: string , options: any) {
        this.xmlhttpService.request(url,'GET');
    }    post() {
        this.xmlhttpService.request(url,'POST');
    }
    //...
}
```

- Here, **Http** is the **high-level component** whereas **HttpService** is the **low-level component**.
- This design violates DIP A *i.e.* High-level modules should not depend on low-level level modules, it should depend upon its abstraction.
- Ths **Http class** is **forced to depend upon** the **XMLHttpService class**.
- If we **have change the Http connection service**, say we want to connect to internet through **Nodejs** or even **Mock** the **http service**.
- We will painstakingly have to move through all the instances of Http to edit the code and this violates the OCP principle.

###### To make our Http class conform to DIP we introduce Connection Interface abstraction.

```c#
interface Connection {
    request(url: string, opts:any);
}
```

- The **Connection interface** has a **request()** method, with this, we pass in an argument of type Connection to our Http class.

```c#
class Http {
    constructor(private httpConnection: Connection){}    
    get(url: string , options: any) {
        this.httpConnection.request(url,'GET');
    }    post() {
        this.httpConnection.request(url,'POST');
    }
    //...
}
```

- So now, no matter the type of Http connection service passed to Http it can easily connect to a network without bothering to know the type of network connection.
- We can now re-implement our XMLHttpService class to implement the Connection interface.
- We can also create many Http Connection types and pass it to our Http class without any fuss about errors.

```c#
class XMLHttpService implements Connection {
    const xhr = new XMLHttpRequest();
    //...
    request(url: string, opts:any) {
        xhr.open();
        xhr.send();
    }
}

class NodeHttpService implements Connection {
    request(url: string, opts:any) {
        //...
    }
}

class MockHttpService implements Connection {
    request(url: string, opts:any) {
        //...
    }    
}
```

- Now, we can see that both high-level modules and low-level modules depend on abstractions.
- **Http class(high level module)** depends on the **Connection interface(abstraction)** and the **Http service types(low level modules)** in turn, also depends on the **Connection interface(abstraction)**.

<br>

----

