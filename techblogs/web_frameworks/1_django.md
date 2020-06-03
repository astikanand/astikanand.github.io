# Django

Django is a very popular python web framework

## Install, Package, Manage

### Shell

**To open the shell:**

```bash
python manage.py shell
```

**Import models and start working:**

```bash
>>> from article.models import Article
>>> articles = Article.objects.all()
>>> print(articles)
```





## Settings

#### Serve static and media files when DEBUG=False

**imports**

```python
from django.urls import path, re_path
from django.conf import settings
from django.views.static import serve
```



**urls.py**

```python
re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
re_path(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),
```







## Urls: Django Routing

Django routings





## Views: Django Logics

### Function Based Views

```python
# Total number of books.
>>> Book.objects.count()
2452

# Total number of books with publisher=BaloneyPress
>>> Book.objects.filter(publisher__name='BaloneyPress').count()
73

# Average price across all books.
>>> from django.db.models import Avg
>>> Book.objects.all().aggregate(Avg('price'))
{'price__avg': 34.35}

# Max price across all books.
>>> from django.db.models import Max
>>> Book.objects.all().aggregate(Max('price'))
{'price__max': Decimal('81.20')}

# Difference between the highest priced book and the average price of all books.
>>> from django.db.models import FloatField
>>> Book.objects.aggregate(
...     price_diff=Max('price', output_field=FloatField()) - Avg('price'))
{'price_diff': 46.85}

# All the following queries involve traversing the Book<->Publisher
# foreign key relationship backwards.

# Each publisher, each with a count of books as a "num_books" attribute.
>>> from django.db.models import Count
>>> pubs = Publisher.objects.annotate(num_books=Count('book'))
>>> pubs
<QuerySet [<Publisher: BaloneyPress>, <Publisher: SalamiPress>, ...]>
>>> pubs[0].num_books
73

# Each publisher, with a separate count of books with a rating above and below 5
>>> from django.db.models import Q
>>> above_5 = Count('book', filter=Q(book__rating__gt=5))
>>> below_5 = Count('book', filter=Q(book__rating__lte=5))
>>> pubs = Publisher.objects.annotate(below_5=below_5).annotate(above_5=above_5)
>>> pubs[0].above_5
23
>>> pubs[0].below_5
12

# The top 5 publishers, in order by number of books.
>>> pubs = Publisher.objects.annotate(num_books=Count('book')).order_by('-num_books')[:5]
>>> pubs[0].num_books
1323
```



```python
from django.db.models import Count, Exists, OuterRef

Category.objects.annotate(
    num_products=Count('products'),
    is_viewed=Exists(View.objects.filter(category=OuterRef('pk')))
)


from django.db.models import Sum

Buy.objects.filter(sell__buyer__isnull=True
                   ).aggregate(sum_buy_price=Sum('buy_price'),
                               sum_sell_price=Sum('sell_price'))
```



### Class Based Views

##### Get Url parameters using kwargs

**urls.py**

```python
path('<int:report_quarter>/<int:report_year>/', FeedbackListView.as_view(), name='feedbacks_quarter_list')
```

**views.py**

```python
def get_context_data(self, **kwargs):
  report_quarter = self.kwargs['report_quarter']
  report_year = self.kwargs['report_year']
```



```python
class FixtureViewSet(viewsets.ModelViewSet):
    serializer_class = FixtureSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ('date', "home", "away",)

    def get_queryset(self):
        given_date = self.request.query_params.get('date')
        queryset = Fixture.objects.filter(date__date=given_date).order_by('date')

        return queryset
















```





### Generic Views

#### 1. ListView

> **Override the context data**

```python
class ArticleListView(ListView):
    model = Article

    def get_context_data(self, *args, **kwargs):
        context_data = super().get_context_data(*args, **kwargs)
        if context_data['object_list']:
            context_data['object_list'] = context_data['object_list'].order_by('-date')
        return context_data
```





## Models: Django Database Handling

### Ordering 

> **Setting Ordering of elements:** 

Need to set `ordering` in `Meta` of the model. 

```python 
class Article(models.Model): 
    title = models.CharField(max_length=255)
    body = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse('article_detail', args=[str(self.id)])
    
    class Meta:
        ordering = ['-created_date'] 
```



### Relationships 

#### One-to-One Releationship 

```python 
class Woman(models.Model):
    name = models.CharField(max_length=100)

class Man(models.Model):
    name = models.CharField(max_length=100)
    wife = models.OneToOneField(Woman, related_name = 'husband', null=True, blank=True, on_delete=models.SET_NULL) 
```

```bash 
>>> john = Man.objects.create(name='John') 
>>> alice = Woman.objects.create(name='Alice')
>>> susan = Woman.objects.create(name='Susan')
>>> john.wife = alice
>>> alice.husband # The marriage was brief... 
>>> john.wife = None
>>> john.save()
>>> john.wife = susan
>>> john.save()
>>> susan.save()
>>> alice.save()
```



> **related_name:** 

The related_name attribute specifies the name of the `reverse` relation from the **Parent model** back to **child model**. 
If we don't specify a related_name, Django automatically creates one using the name of child model with the suffix `_set`, for instance `User.article_set.all()`.





### Override save()

We can override save method in django model.

```python
class ModelAdmin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        obj.save(form=form)
```



```python
class Model(model.Model):
    description=models.CharField()

    # this is not needed if small_image is created at set_image
    def save(self, *args, **kwargs):
        self.description = "my desc"
        super(Model, self).save(*args, **kwargs)
```



### Null  vs. Blank

When looking at the options in a Django model definition, it's crucial to understand that they serve (at least) two purposes: defining the database tables, and defining the default format and validation of model forms. (I say "default" because the values can always be overridden by providing a custom form.) Some options affect the database, some options affect forms, and some affect both.

When it comes to `null` and `blank`, other answers have already made clear that the former affects the database table definition and the latter affects model validation. I think the distinction can be made even clearer by looking at the use cases for all four possible configurations:

- `null=False`, `blank=False`: This is the default configuration and means that the value is required in all circumstances.
- `null=True`, `blank=True`: This means that the field is optional in all circumstances. (As noted below, though, this is *not* the recommended way to make string-based fields optional.)
- `null=False`, `blank=True`: This means that the form doesn't require a value, but the database does. There are a number of use cases for this:
  - The most common use of this configuration is for optional string-based fields. As [noted in the documentation](https://docs.djangoproject.com/en/dev/ref/models/fields/#null), the Django idiom is to use the empty string to indicate a missing value. If `NULL` was also allowed you would end up with two different ways to indicate a missing value.
  - Another common situation is that you want to calculate one field automatically based on the value of another (in your `save()` method, say). You don't want the user to provide the value in a form (hence `blank=True`), but you do want the database to enforce that a value is always provided (`null=False`).
  - Another use of this configuration is when you want to indicate that a `ManyToManyField` is optional. Because this field is implemented as a separate table rather than a database column, [`null` is meaningless](https://stackoverflow.com/a/18244527/2395796). The value of `blank` will still affect forms, though, controlling whether or not validation will succeed when there are no relations.
- `null=True`, `blank=False`: This means that the form requires a value, but the database doesn't. This may be the most infrequently used configuration, but there are some use cases for it:
  - It's perfectly reasonable to require your users to always include a value even if it's not actually required by your business logic. After all, forms are only one way of adding and editing data. You may have code that is generating data which doesn't need the same stringent validation that you want to require of a human editor.
  - Another use case for this that I've seen is when you have a `ForeignKey` for which you don't wish to allow [cascade deletion](https://docs.djangoproject.com/en/dev/ref/models/fields/#django.db.models.ForeignKey.on_delete). That is, in normal use the relation should always be there (`blank=False`), but if the thing it points to happens to be deleted, you don't want this object to be deleted too. In that case you can use `null=True` and `on_delete=models.SET_NULL`to implement a simple kind of [soft deletion](https://stackoverflow.com/questions/378331/physical-vs-logical-soft-delete-of-database-record).





## Templates: Django HTML Pages

### Loop Counter

> Use **forloop.counter** provided by django:

```django
{% raw %}
{% for item in item_list %}
    {{ forloop.counter }} # starting index 1
    {{ forloop.counter0 }} # starting index 0

    # do your stuff
{% endfor %}
{% endraw %}
```







### Math Operations

```django
pip install django-mathfilters
```

```django
load mathfilters
item.min_count|div:2 
```









## Forms: Handling Posts in Django 

Django Forms





## Serializers: Working with REST in Django

Django Serializers





## Django Admin panel

Dealing with admin panel





## jQUERY Methods and Ajax in Django

### AJAX : $.ajax()

> **Validate using Ajax if username already exists while SignUp:**

##### views.py

```python
from django.contrib.auth.models import User
from django.http import JsonResponse

def validate_username(request):
    username = request.GET.get('username', None)
    data = {
        'is_taken': User.objects.filter(username__iexact=username).exists()
    }
    if data['is_taken']:
        data['error_message'] = 'A user with this username already exists.'
        
    return JsonResponse(data)
```

##### template.html

```django
{% raw %}
{% extends 'base.html' %}

{% block javascript %}
  <script>
    $("#id_username").change(function () {
      var form = $(this).closest("form");
      $.ajax({
        url: form.attr("data-validate-username-url"),
        data: form.serialize(),
        dataType: 'json',
        success: function (data) {
          if (data.is_taken) {
            alert(data.error_message);
          }
        }
      });

    });
  </script>
{% endblock %}

{% block content %}
  <form method="post" data-validate-username-url="{% url 'validate_username' %}">
    {% csrf_token %}
    {{ form.as_p }}
    <button type="submit">Sign up</button>
  </form>
{% endblock %}
{% endraw %}
```





### JSON: $.getJSON()

> **Getting JSON from API url:**

##### views.py

```python
from rest_framework.response import Response
from rest_framework.views import APIView

class FeedbackNetworkAPIView(APIView):
    def get(self, request):
        . . . . .  .

        # tuple to avoid: TypeError: unhashable type: 'list'
        track_data = {
            "nodes": tuple(nodes),
            "edges": tuple(edges),
        }

        return Response(track_data)
```

##### template.html

```html
<script>
$.getJSON('http://localhost:8000/feedback/network/api/', function (data) {
    $nodes = data["nodes"];
    $edges = data["edges"];

    var nodes = new vis.DataSet($nodes);
    var edges = new vis.DataSet($edges);
    var container = document.getElementById('mynetwork');
    var data = {nodes: nodes, edges: edges};
    var options = {};
    var network = new vis.Network(container, data, options);
});
</script>
```







## Decorators

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







## Middlewares

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

