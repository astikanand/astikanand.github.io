# Bin

> **Tessian:**

```python
# Enter your code here

# Coocurrence of a and b, C(a, b) is the number of lines that contains both a and b

# ALICE BOB
# BOB CLAIRE DAN

# c = Cooccurence()
# c.update("ALICE BOB")
# c.update("BOB CLAIRE DAN")
# c.get("ALICE", "BOB") == 1
# c.get("BOB", "ALICE") == 1
# c.get("CLAIRE", "ALICE") == 0

class Cooccurence:
    def __init__(self):
        self.data = {}
        self.lineNumber = 0
    
    def get(self, a, b):
        return len(self.data.get(a, set()).intersection(self.data.get(b, set())))

    def update(self, line):
        self.lineNumber += 1
        for word in line.split(" "):
            try:
                self.data[word].add(self.lineNumber)
            except:
                self.data[word] = set()
                self.data[word].add(self.lineNumber)
        
        


c = Cooccurence()
c.update("ALICE BOB")
c.update("BOB CLAIRE DAN")
print(c.get("ALICE", "BOB"))
print(c.get("BOB", "ALICE"))
print(c.get("CLAIRE", "ALICE"))
```



==================================================================================================================