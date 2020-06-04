# Python: Extras

Sort in desceding a/c to value and if same values sort increasing order of id.

```python
##
# Sorting
#

activities.sort(key=lambda k: (k[1], -k[0]))
sorted_activities = sorted(activitites.items(), key=lambda k: (k[1], -k[0]))

# Exceptional method using tuple
def reorderLogFiles(logs):
  def f(log):
    id_, rest = log.split(" ", 1)
    return (0, rest, id_) if rest[0].isalpha() else (1,)

  return sorted(logs, key = f)


##
# Filter
#
numeric_logs = list(filter(lambda k: k.split()[1].isnumeric(), logs))

##
# Max and Min
#
max([(12, 1), (10, 5), (18, 4), (13, 5)], key=lambda k: k[0])


```

