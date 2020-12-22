---
permalink: /techblogs/high-level-system-design/tools-techniques
topic: tools-techniques
---



# Some Tools & Technologies for System Design

###### Cassandra:

- Wide column highly scalable database.
- Used for different use-cases like simple key-value storage or for storing time-series data or just our more traditional rows with more columns.
- Can provide both eventual and strong consistency.
- Under the hood Cassandra uses consistent hashing to shard the data and also uses gossiping to keep all the nodes informed about the cluster.

###### MongoDB / Hbase:

- If we have JSON like structure and we want to persist that then MongoDB works perfectly fine.
- They provide ACID properties at the document level and they scale pretty well.

###### MySQL:

- More traditional use case with many tables and relationships and if we want full set of ACID properties we use MySQL.
- It also has Master-Slave Architectures so it also scales up pretty well.

###### Memcached / Redis:

- Memcached and redis are distributed cache and they hold the data in-memory.
- Memcached is simple, fast key-value storage.
- Redis can also do the key-value storage but it also does lot of other things.
- Redis can also setup as a cluster so we can provide things like more availability and data application.
- Redis can also flush the data on the hard-drive if we configure it to do so.
- **Need to** **remember** **2 things while using distributed cache:**
    - They should never be the source of truth.
    - They can only hold the limited amount of data which is limited by the amount of memory on the host.

###### Zookeeper:

- It is a centralized configuration management tool.
- Also used for things like leader election and distributed locking.
- It scales very well for the reads but does not scale that well for the writes.
- Also since zookeeper keeps all data in-memory, so we can’t store too much data in zookeeper.
- So, if we want to store small amount of data which would be highly available and which has tons of reads, the zookeeper is used.

###### Kafka:

- It is a fault-tolerant highly available queue using publisher subscriber or streaming applications.
- Depending on the use-case it can deliver the message exactly once and also it keeps all the message ordered inside a partition of a topic.

###### Nginx / HaProxy:

- Nginx and HaProxy are load-balancers and are very efficient.
- Nginx can manage thousands or even tens of thousands of connection from a client from a single instance.

###### Solr / ElasticSearch:

- Both are search platforms on top of Lucene.
- Both are highly available, very scalable fault tolerant search platform and they do provide things like full-text search.

###### Blobstores like S3:

- If we have a big picture or big image and we want to store somewhere in the cloud then blobstores can be used.
- Very popular available blobstore is Amazon S3.

###### Docker - Kubernetes & Mesos:

- It is a software platform that provides containers inside which we can develop and run our distributed applications.
- These containers can run on our laptop, on the data-centre or even on the cloud.
- **Kubernetes** **&** **Mesos** are software tools that are used to manage and coordinate these containers. 

###### Big Data:

- **Hadoop:** 
    - It has many things going under inside it and one of those things is Map-reduce.
    - Map-Reduce is processing in parallel of large data.
    - HDFS is a Java based file system which is distributed and fault tolerant and Hadoop relies on it to do all its processing.
- **Spark:**
    - Faster version of doing Map-reduce.
    - It does Map-Reduce in-memory.

<br>

<br>

------

<a href="step-by-step-guide" class="prev-button">&larr; Previous: Step By Step Guide</a> 

<a href="design-tiny-url-service" class="next-button">Next: Design Tiny Url Service &rarr;</a>

