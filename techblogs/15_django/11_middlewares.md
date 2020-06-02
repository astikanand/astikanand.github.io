# Middlewares

###### What are middlewares ?

- Middleware is a regular Python class that hooks into Django’s request/response life cycle.
- Those classes holds pieces of code that are processed upon *every* request/response your Django application handles.
- The Middleware classes doesn’t have to subclass anything and it can live anywhere in your Python path.
- The only thing Django cares about is the path we register in the project settings **MIDDLEWARE_CLASSES**.

##### Our Middleware class should define at least one of the following methods:

- **Called during request:**
    - process_request(request)
    - process_view(request, view_func, view_args, view_kwargs)
- **Called during response:**
    - process_exception(request, exception) —  (only if the view raised an exception)
    - process_template_response(request, response) — (only for template responses)
    - process_response(request, response)

#### How it works?

- The Middlware classes are called twice during the request/response life cycle.
- For that reason, the order you define the Middlwares in the **MIDDLEWARE_CLASSES** configuration is important.
- Let’s have a look on the built-in Middleware classes the **django-admin startproject** command sets up

```python
MIDDLEWARE_CLASSES = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware’,
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

###### Request Cycle

- During the request cycle, the Middleware classes are executed top-down.
- Meaning it will first execute **`SecurityMiddleware`**, then **`SessionMiddleware`** all the way until **`XFrameOptionsMiddleware`**.
- For each of the Middlewares it will execute the **process_request()** and **process_view()** methods.
- At this point, Django will do all the work on your view function.
- After the work is done (e.g. querying the database, paginating results, processing information, etc), it will return a response for the client.

###### **Response Cycle**

- During the response cycle, the Middleware classes are executed bottom-up.
- Meaning it will first execute **`XFrameOptionsMiddleware`**, then **`MessageMiddleware`** all the way until **`SecurityMiddleware`**.
- For each of the Middlewares it will execute the **process_exception()**, **process_template_response()** and **process_response()** methods.
- Finally Django will deliver the response for the client.
- It is important to note that process_exception() is only executed if a exception occurs inside the view function and process_template_response() is only executed if there is a template in the response.
- The image below was extracted from the official Django documentation and it represents well the process described above.

<img src="assets/django_middle_ware_request_response.svg" width="50%">

### Creating Custom Middlewares

- Let’s create a custom Middleware class that intercept all the exceptions that occur in our view functions.
- It then grab the exception message and query the StackOverflow API and return the three top answers and print it to the terminal.
- I will call it StackOverflow Exception Troubleshooting, or simply **SOET**.
- So it’s gonna be a Middleware for debugging, meant to run only when **`DEBUG=True`**.

This is what our Middleware will look like:

<img src="assets/middleware_django_example.png" width="60%">

Our view function throws an uncaught exception, the **SOET** Middleware process it, search for a solution on StackOverflow, and print the three most relevant results for the developer directly in this terminal window.

Cool right? We will see how easy it is to implement it.

###### Getting started

- For this example I created a Django app named soet because I wanted to make it available for everyone.
- But if you already have an app that makes sense to create the middleware in, go ahead.
- Inside the **soet** app I created a file named **middleware.py**
- At the moment it looks like:

```python
class StackOverflowMiddleware(object):
    def process_exception(self, request, exception):
        return None
```

Now register the new Middleware in the **MIDDLEWARE_CLASSES** configuration:

```python
MIDDLEWARE_CLASSES = [
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'soet.middleware.StackOverflowMiddleware',
]
```

I’ve **registered it as the last** one because the **process_exception()** method is only processed during the **response**cycle, and I want my middleware to be executed first so no other Middleware supress the thrown exception.



At this point our brand new Middleware isn’t doing anything really. But it is already being executed. We can test it by putting a **print** statement inside the **process_exception()** method. Also it is important that our method always return **None** so to keep the flow of the Middlewares processing. We don’t want to affect the behavior of what is returned to the client.



Now also let’s make sure we are only executing this Middleware if the **DEBUG=True**:

```python
from django.conf import settings
class StackOverflowMiddleware(object):
    def process_exception(self, request, exception):
        if settings.DEBUG:
            print exception.__class__.__name__
            print exception.message
        return None
```

##### Consuming StackOverflow API

- The idea now is to use the exception message and the exception name to query the StackOverflow database through its API in order to find relevant solutions.
- To save us some time and avoid struggling with the python standard libraries urllib and urllib2, let’s just use the awesome [Requests](http://docs.python-requests.org/en/master/) library.
- Also I will not go into much detail about the [StackOverflow API](https://api.stackexchange.com/docs).
- The previous link will take you to the official documentation where you can learn more.
- That being said, I will stick with the /2.2/search endpoint.

```python
import requests
from django.conf import settings


class StackOverflowMiddleware(object):
    def process_exception(self, request, exception):
        if settings.DEBUG:
            intitle = u'{}: {}'.format(exception.__class__.__name__,  exception.message)
            print intitle
            url = 'https://api.stackexchange.com/2.2/search'
            params = {
                'order': 'desc',
                'sort': 'votes',
                'site': 'stackoverflow',
                'pagesize': 3,
                'tagged': 'python;django',
                'intitle': intitle
            }
            r = requests.get(url, params=params)
            questions = r.json()
            print ''
            for question in questions['items']:
                print question['title']
                print question['link']
                print ''
        return None
```

