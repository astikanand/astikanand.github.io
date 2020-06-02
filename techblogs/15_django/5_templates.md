# Templates: Django HTML Pages

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

