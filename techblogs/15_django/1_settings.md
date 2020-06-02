# Settings

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

