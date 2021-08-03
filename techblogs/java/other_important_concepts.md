# Other Important Concepts

These are few concepts which we are covering as outside the section materials we have divided.



## Access Specifiers

###### For methods and data members

- In Java, methods and data members of a class/interface can have one of the following four access specifiers. 
- The access specifiers are listed according to their restrictiveness order.
    1. private
    2. default (when no access specifier is specified)
    3. protected
    4. public

###### For classes and interfaces

- The classes and interfaces themselves can have only two access specifiers when declared outside any other class.
    1. public
    2. default (when no access specifier is specified)
- We cannot declare class/interface with private or protected access specifiers.
- Nested interfaces and classes can have all access specifiers.





## Access Modifiers

- As the name suggests access modifiers in Java helps to restrict the scope of a class, constructor , variable , method or data member.
- There are four types of access modifiers available in java:
    1. Default – No keyword required
    2. Private
    3. Protected
    4. Public

<img src="assets/Access-Modifiers-in-Java.png" width="65%">



- When no access modifier is specified for a class , method or data member – it will have **default** access modifier.

##### Important Points:

- If other programmers are using our class, need to use the most restrictive access level that makes sense for a particular member.

- Use private unless you have a good reason not to.

    Avoid public fields except for constants.



## Object Class

###### What is an Object Class ?

- **Object** class is present in **java.lang** package.
- Every class in Java is directly or indirectly derived from the **Object** class.
- If a Class does not extend any other class then it is direct child class of **Object** and if extends other class then it is an indirectly derived.
- Therefore the Object class methods are available to all Java classes. 
- Hence Object class acts as a root of inheritance hierarchy in any Java Program.

#### Methods in Object Class:

1. **toString()**

    - Provides String representation of an Object and used to convert an object to String

    ```java
    // Default behavior of toString() is to print class name, then @, 
    // then unsigned hexadecimal representation of the hash code of the object
    public String toString() {
        return getClass().getName() + "@" + Integer.toHexString(hashCode());
    }
    ```

    - It is always recommended to override **toString()** method to get our own String representation of Object. 

    - Whenever we try to print any Object reference, then internally toString() method is called.

    ```java
    Student s = new Student();
    // Below two statements are equivalent
    System.out.println(s);
    System.out.println(s.toString());
    ```

    

2. **hashCode()**

    - For every object, JVM generates a unique number which is hashcode. 
    - It returns distinct integers for distinct objects. 
    - A common misconception about this method is that hashCode() method returns the address of object, which is not correct. 
    - It convert the internal address of object to an integer by using an algorithm. 
    - The hashCode() method is **native** because in Java it is impossible to find address of an object, so it uses native languages like C/C++ to find address of the object.
    - ***Use of hashCode() method :*** 
        - Returns a hash value that is used to search object in a collection. 
        - JVM(Java Virtual Machine) uses hashcode method while saving objects into hashing related data structures like HashSet, HashMap, Hashtable etc. 
        - The main advantage of saving objects based on hash code is that searching becomes easy.

    ##### Note:

    - Override of **hashCode()** method needs to be done such that for every object we generate a unique number. 
    - ***Example:*** for a Student class we can return roll no. of student from hashCode() method as it is unique.

    ```java
    // Java program to demonstrate working of hasCode() and toString() 
    public class Student { 
      static int last_roll = 100;  
      int roll_no; 
    
      // Constructor 
      Student() { 
        roll_no = last_roll; 
        last_roll++; 
      } 
    
      // Overriding hashCode() 
      @Override
      public int hashCode() { 
        return roll_no; 
      } 
    
      // Driver code 
      public static void main(String args[]) { 
        Student s = new Student(); 
        // Below two statements are equivalent 
        System.out.println(s); 
        System.out.println(s.toString()); 
      }
      
      //Remember: toString() :- return getClass().getName() + "@" + Integer.toHexString(hashCode());
    } 
    ```

    **Output:**

    ```
    Student@64
    Student@64
    
    // Answer is 64 coz when 100 is converted to Hexadecimal string it becomes 64.
    ```

    

3. **equals(Object obj)**

    - Compares the given object to **"this"** object (the object on which the method is called).
    - It gives a generic way to compare objects for equality. 
    - It is recommended to override **equals(Object obj)** method to get our own equality condition on Objects.

    ##### Note:

    - It is generally necessary to override the **hashCode()** method whenever this method is overridden.
    - So as to maintain the general contract for the hashCode method, which states that equal objects must have equal hash codes.

    

4. **getClass():**

    - Returns the class object of  **"this"** object and used to get actual runtime class of the object.
    - It can also be used to get metadata of this class. 
    - The returned Class object is the object that is locked by static synchronized methods of the represented class.
    - As it is final so we don’t override it.

    ```java
    public class Test { 
      public static void main(String[] args) { 
        Object obj = new String("GeeksForGeeks"); 
        Class c = obj.getClass(); 
        System.out.println("Class of Object obj is : "+ c.getName()); 
      } 
    }
    ```

    **Output:**

    ```
    Class of Object obj is : java.lang.String
    ```

    ##### Note:

    - After loading a ***.class*** file, JVM will create an object of the type *java.lang.Class* in the Heap area.

    - We can use this class object to get Class level information. 

    - It is widely used in [Reflection](https://www.geeksforgeeks.org/reflection-in-java/).

      ​    

5. **finalize()**: 

    - This method is called just before an object is garbage collected. 
    - Called by the [Garbage Collector](https://www.geeksforgeeks.org/garbage-collection-java/) on an object when garbage collector determines that there are no more references to the object. 
    - We should override finalize() method to dispose system resources, perform clean-up activities and minimize memory leaks. 
    - ***Example:*** Before destroying Servlet objects web container, always called finalize method to perform clean-up activities of the session.
    - finalize method is called just **once** on an object even though that object is eligible for garbage collection multiple times.

    ```java
    public class Test { 
      public static void main(String[] args) { 
        Test t = new Test(); 
        System.out.println(t.hashCode()); 
    
        t = null; 
        // calling garbage collector  
        System.gc(); 
    
        System.out.println("end"); 
      } 
    
      @Override
      protected void finalize() { 
        System.out.println("finalize method called"); 
      } 
    } 
    ```

    **Output:**

    ```
    366712642
    finalize method called
    end
    ```

    

6. **clone()**:

    - It returns a new object that is exactly the same as this object.

    - Refer [Clone()](https://www.geeksforgeeks.org/clone-method-in-java-2/)

      ​    

7. **wait()**, **notify()** & **notifyAll()** 

    - Thay all are related to Concurrency.

    - Refer [Inter-thread Communication in Java ](https://www.geeksforgeeks.org/inter-thread-communication-java/)for details.





## Constructors

https://www.geeksforgeeks.org/constructors-in-java/















## Generics

https://www.geeksforgeeks.org/generics-in-java/