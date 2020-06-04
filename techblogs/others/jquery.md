# jQuery

#### Adding Dynamic Class

Since the `class` is added dynamically, you need to use event delegation to register the event handler

```javascript
$(document).on('click', "a.tabclick", function() {
    var liId = $(this).parent("li").attr("id");
    alert(liId);        
});
```

