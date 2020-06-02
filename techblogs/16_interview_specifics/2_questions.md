# Questions

###### Implement your own hashmap



###### Solve "out of memory exception"  on production

- Try to log the critical error or failure logs somewhere.
- In short, and very simplified, "Out of memory" does not really mean that the amount of available memory is too small.
- The most common reason is that within the current address space, there is no contiguous portion of memory that is large enough to serve the wanted allocation.
- If you have 100 blocks, each 4 MB large, that is not going to help you when you need one 5 MB block.
- ***Key Points:***
  - the data storage that we call “process memory” is in my opinion best visualized as a massive file on disk.
  - RAM can be seen as merely a performance optimization
  - Total amount of virtual memory your program consumes is really not hugely relevant to its performance
  - "running out of RAM" seldom results in an “out of memory” error. Instead of an error, it results in bad performance because the full cost of the fact that storage is actually on disk suddenly becomes relevant.



