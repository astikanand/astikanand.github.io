# Decorators

###### What are decorators ?

- Decorators are nothing but a function that takes a function and returns the decorated function.
- The returned decorated function at most of times are the same function that was taken as input, but after some manipulation or validation.
- The returned decorated function can be a completely new function, but then it doesn’t solve the purpose.
- **decorator syntax:** **@decorator** is nothing but **foo = bar( foo )**, where foo and bar are both functions 

#### Writing Custom Decorator

```python
In [1]: def good_function():
   ...:     print 'I am a good function'
   ...:
   ...:
In [2]: def decorator(orig_func):
   ...:     def bad_func():
   ...:         print 'I am a bad function'
   ...:     return bad_func
   ...:
In [3]: good_function = decorator(good_function)
In [4]: good_function()
I am a bad function
In [5]: @decorator
   ....: def good_function2():
   ....:     print 'I am a good function'
   ....:
   ....:
In [6]: good_function2()
I am a bad function
```

- So we can see that the **decorated function depended only on the value of the function returned by the decorator**.
- Here we discarded the function we were passed.
- Any useful decorator, *decorates* the original function, so it would use the original function.

##### An actual decorator which may be useful.

```python
import math
def is_val_positive_deco(orig_func):
        def temp_func(val):
                if val < 0:
                        return 0
                else:
                        return orig_func(val)
        return temp_func

    
@is_val_positive_deco
def sqrt(val):
        return math.pow(val, (1.0/2))
    
    
print sqrt(-1)
print sqrt(4)
```

- Here we defined an decorator **`is_val_positive_deco`** which will make functions return 0, if the argument passed is negative. 
- We can use this decorator to guard against MathErrors.

### Class Based Decorators

- Decorators are just callables, and hence can be a class which has **`__call__`** method.
- Sometimes they are easier to understand and reason about(than decorators written as functions).

```python
class LogArgumentsDecorator(object):
        def __init__(self, orig_func):
                self.orig_func = orig_func
                print 'started logging: %s' % orig_func.__name__
                
        def __call__(self,  *args, **kwargs):
                print 'args: %s' % args
                print 'kwargs:%s'% kwargs
                return self.orig_func(*args, **kwargs)
            
            
@LogArgumentsDecorator
def sum_of_squares(a, b):
        return a*a + b*b
    
print sum_of_squares(3, b=4)
```

**Output:**

```
started logging: sum_of_squares
args: 3
kwargs:{'b': 4}
25
```

##### Django’s LoginRequiredDecorator

```python
class LoginRequiredDecorator(object):
    def __init__(self, orig_func):
        self.orig_func = orig_func
        
    def __call__(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            self.orig_func(request, *args, **kwargs)
        else:
            return HttpResponseRedirect(reverse('...'))
```

