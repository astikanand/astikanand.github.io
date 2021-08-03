---
permalink: /techblogs/high-level-system-design/design-pastebin
topic: design-pastebin
---



# Design Pastebin

###### Problem Statement:

- Let's design a Pastebin like web service, where users can store plain text.
- Users of the service will enter a piece of text and get a randomly generated URL to access it. 
- **Similar Services:** pasted.co, hastebin.com, chopapp.com 
- **Difficulty Level:** Easy

<br>

#### Step-1: What is Pastebin?

- Pastebin like services enable users to store plain text or images over the network (typically the Internet) and generate unique URLs to access the uploaded data.
- Such services are also used to share data over the network quickly, as users would just need to pass the URL to let other users see it.
  If you haven’t used pastebin.com before, please try creating a new ‘Paste’ there and spend some time going through different options their service offers. This will help you a lot in understanding this chapter better.

**Example:**

**Pastebin Site URL:** [https://pastebin.com](https://pastebin.com)

**Access Pastebin Content:** [https://pastebin.com/Ha3CnnyK](https://pastebin.com/Ha3CnnyK)

![](assets/paste_bin_example.png)

<br>

#### Step-2: Requirements and Goals of the System

- Our Pastebin service should meet the following requirements:
- [Functional Requirements:]()
  1. Users should be able to upload or **'paste'** their data and geta unique URL to access it.
  2. Users will only be able to upload text.
  3. Data and links will expire after a specific timespan automatically; users should also be able to specify expiration time.
  4. Users should optionally be able to pick a custom alias for their paste.
- [Non-Functional Requirements:]()
  1. The system should be highly reliable, any data uploaded should not be lost.
  2. The system should be highly available, coz if service is down, users will not be able to access their Pastes.
  3. Users should be able to access their Pastes in real-time with minimum latency.
  4. Paste links should not be guessable (not predictable).
- [Extended Requirements:]()
  1. Analytics, e.g., how many times a redirection happened?
  2. Our service should also be accessible through REST APIs by other services.

<br>

#### Step-3: Some Design Considerations
- Pastebin shares some requirements with tiny URL service, but there are some additional design considerations we should keep in mind.
- What should be the limit on the amount of text user can paste at a time ? 
- We can limit users not to have Pastes bigger than 10MB to stop the abuse of the service.
- Should we impose size limits on custom URLs ? 
- Since our service supports custom URLs, users can pick any URL that they like, but providing a custom URL is not mandatory.
- However, it is reasonable (and often desirable) to impose a size limit on custom URLs, so that we have a consistent URL database.

<br>

#### Step-4: Capacity Estimation and Constraints

- Our services would be read heavy; there will be more read requests compared to new Pastes creation.
- Let's assume **5:1 ratio** between **read and write**.

###### Traffic estimates:

- Let’s assume here that we get **1Million new pastes per day** added to our system, this leaves us with **5Million reads per day**.
- **New pastes per second:** 1M / (24 hours * 3600 seconds) ~= **12 pastes/sec**
- **Paste reads per second:** 5M / (24 hours * 3600 seconds) ~= **58 reads/sec**

###### Storage estimates:

- Users can upload maximum 10MB of data; commonly Pastebin like services are used to share source code, configs or logs.
- Such texts are not huge, so let’s assume that **each paste on average contains 10KB**.
- At this rate **Data Storage per day:** 1M * 10KB => **10 GB/day**
- If we want to **store this data for 10 years**, we would need the **Total storage capacity** = **36TB**.
- With **1M pastes per day** we will have **3.6 billion Pastes in 10 years**.
- We need to generate and store keys to uniquely identify these pastes.
- If we use **base64 encoding ([A-Z, a-z, 0-9, ., -])** we would **need 6 letters strings:** 64^6 ~= **68.7 billion unique strings**.
- If it takes **one byte to store one character** the **total size required to store 3.6B keys** would be: 3.6B * 6 => **22 GB**
- 22GB is negligible compared to 36TB. To keep some margin, we will assume a 70% capacity model (meaning we don’t want to use more than 70% of our total storage capacity at any point), which raises our storage needs up to 47TB.

###### Bandwidth estimates:

- For **write requests**, we expect **12 new pastes/second**, the **total incoming data per second (ingrees)**: 12 * 10KB => **120 KB/sec**
- For **read requests**, we expect **58 requests/second**, the **total outgoing data per second (egrees)**: 58 * 10KB => **0.6 MB/sec**

- Although total ingress and egress are not big, we should keep these numbers in mind while designing our service.

###### Memory estimates:

- We can cache some of the hot pastes that are frequently accessed.
- Following 80-20 rule, meaning 20% of hot pastes generate 80% of traffic, we would like to cache these 20% pastes.
- Since we have **5M read requests per day**, to cache 20% of these requests, we would need **cache storage**: 0.2 * 5M * 10KB ~= **10 GB**.

<br>

#### Step-5: System APIs

- We can have SOAP or REST APIs to expose the functionality of our service.

##### Create API

```
addPaste(api_dev_key, paste_data, custom_url=None user_name=None, paste_name=None, expire_date=None)
```

- [Parameters:]()
  - **api_dev_key (string):** The API developer key of a registered account. This will be used to, among other things, throttle users based on their allocated quota.
  - **paste_data (string):** Textual data of the paste.
  - **custom_url (string):** Optional custom URL.
  - **user_name (string):** Optional user name to be used to generate URL.
  - **paste_name (string):** Optional name of the paste
  - **expire_date (string):** Optional expiration date for the paste.
- [Returns: (string)]()
  - A successful insertion returns the URL through which the paste can be accessed, otherwise, returns an error code.

##### Retrieve API

```
getPaste(api_dev_key, api_paste_key)
```

- [Parameters:]()
  - **api_paste_key(string):** string representing the Paste Key of the paste to be retrieved.
- [Returns: (string)]()
  - This API will return the textual data of the paste.

##### Delete API

```
deletePaste(api_dev_key, api_paste_key)
```

- A successful deletion returns **true**, otherwise returns **false**.

<br>

#### Step-6: Database Design

- A few observations about nature of the data we are going to store:
  1. We need to store billions of records.
  2. Each metadata object we are going to store would be small (less than 100 bytes).
  3. Each paste object we are storing can be of medium size (it can be a few MB).
  4. There are no relationships between records, except if we want to store which user created what Paste.
  5. Our service is read heavy.

- [Database Schema:]()
  - We would need two tables, one for storing information about the Pastes and the other for users’ data.

<img src="assets/database_design.png" style="width:45%;" />

<br>

#### Step-7: High Level Design

- At a high level, we need an application layer that will serve all the read and write requests.
- Application layer will talk to a storage layer to store and retrieve data.
- We can segregate our storage layer with one database storing metadata related to each paste, users, etc., while the other storing paste contents in some sort of block storage or a database.
- This division of data will allow us to scale them individually.

<img src="assets/pastebin_hld.png" style="width:45%;" />

<br>

#### Step-8: Component Design

> ##### a) Application Layer 

- Our application layer will process all incoming and outgoing requests.
- The application servers will be talking to the backend data store components to serve the requests.

###### How to handle a write request ?

[Solution-1: Generate Hash for key and map to server]()

- Upon receiving a write request, our application server will generate a six-letter random string, which would serve as the key of the paste (if the user has not provided a custom key).
- The application server will then store the contents of the paste and the generated key in the database.
- After the successful insertion, the server can return the key to the user.
- **Possible Problem:**
  - The insertion fails because of a duplicate key.
  - Since we are generating a random key, there is a possibility that the newly generated key could match an existing one. 
- **Solution:**
  - In that case, we should regenerate a new key and try again.
  - We should keep retrying until we don’t see a failure due to the duplicate key.
  - We should return an error to the user if the custom key they have provided is already present in our database.

[Solution-2: Key Generation Service (KGS)]()

- Run a standalone **KGS** that generates random six letters strings beforehand and stores them in a database (let’s call it key-DB).
- Whenever we want to store a new paste, we will just take one of the already generated keys and use it.
- This approach will make things quite simple and fast since we will not be worrying about duplications or collisions.
- KGS will make sure all the keys inserted in **key-DB** are unique.
- KGS can use two tables to store keys, one for keys that are not used yet and one for all the used keys.
- As soon as KGS give some keys to any application server, it can move these to the used keys table.
- KGS can always keep some keys in memory so that whenever a server needs them, it can quickly provide them.
- As soon as KGS loads some keys in memory, it can move them to used keys table, that make sure each server gets unique keys. 
- If KGS dies before using all the keys loaded in memory,  those keys will be wasted but can ignore given a huge number of keys we have.
- **Isn’t KGS single point of failure ?**
  - Yes, it is. To solve this, we can have a standby replica of KGS, and whenever the primary server dies, it can take over to generate and provide keys.
- **Can each app server cache some keys from key-DB ?**
  - Yes, this can surely speed things up. Although in this case, if the application server dies before consuming all the keys, we will end up losing those keys.
  - This could be acceptable since we have 68B unique six letters keys, which are a lot more than we require.

###### How to handle a paste read request ?

- Upon receiving a read paste request, the application service layer contacts the datastore.
- The datastore searches for the key, and if it is found, returns the paste’s contents. Otherwise, an error code is returned.

<br>

> ##### b) Datastore Layer

- We can divide our datastore layer into two:
  1. **Metadata database:** We can use a relational database like MySQL or a Distributed Key-Value store like Dynamo or Cassandra.
  2. **Block storage:** We can store our contents in a block storage that could be a distributed file storage or an SQL-like database. Whenever we feel like hitting our full capacity on content storage, we can easily increase it by adding more servers.

<img src="assets/pastebin_detailed_design.png" width="55%">

<br>

#### Step-9: Data Partitioning and Replication

- Same as the tiny-url design service.

<br>

#### Step-10: Caching and Load Balancer (LB)

- Same as the tiny-url design service.

<br>

#### Step-11: Purging or DB Cleanup

- Same as the tiny-url design service.

<br>

#### Step-12: Telemetry

- Same as the tiny-url design service.

<br>

#### Step-13: Security and Permissions

- Same as the tiny-url design service.

<br>

<br>

---

<a href="design-tiny-url-service" class="prev-button">&larr; Previous: Design Tiny Url Service</a> 

<a href="design-instagram" class="next-button">Next: Design Instagram &rarr;</a>



