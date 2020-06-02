# jQUERY Methods and Ajax in Django



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

