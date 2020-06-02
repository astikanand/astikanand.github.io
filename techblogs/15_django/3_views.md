# Views: Django Logics

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

