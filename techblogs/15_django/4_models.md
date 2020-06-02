# Models: Django Database Handling

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







