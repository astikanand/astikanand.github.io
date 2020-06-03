# MongoDB 

MongoDB is a very popular NoSQL database.

## Installation

**Use Homebrew to install the mongodb.**

```shell
brew tap mongodb/brew
brew install mongodb-community@4.2
```



**Run MongoDB (i.e. the [`mongod`](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) process) as a macOS service.**

```shell
brew services start mongodb-community@4.2
```



**To verify that MongoDB is running, search for `mongod` in your running processes.**

```shell
ps aux | grep -v grep | grep mongod
```

We can view the log file to see the current status of your `mongod` process: `/usr/local/var/log/mongodb/mongo.log`.



**To begin using MongoDB, connect a [`mongo`](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to the running instance. From a new terminal, issue the following:**

```shell
mongo
```

##### MongoDB Compass - GUI for MongoDB

Install the **[MongoDB Compass](https://www.mongodb.com/download-center/compass)** and use it.

#### Use the MongoDB

**Show all the available databases**

```
> show dbs
```



<br>

<br>

---

