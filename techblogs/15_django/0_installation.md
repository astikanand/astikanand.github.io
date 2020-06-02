# 0. Install, Package, Manage

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

