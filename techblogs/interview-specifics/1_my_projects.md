# My Projects

### Jarvis Bot

#### Functions

- Tracks all the inbound GitHub events.
- Makes her decision to inform appropriate persons about it.
- Tracks the assigned issues, requested pull_requests reviews.

#### Processing

Github Inbound Events Occurred  —> Calls the API endpoint configured in Github Web-hooks.

API which is an AWS API Gateway receives the Payload  —> Call the Event_Logger_lambda with the payload

###### Event_Logger_Lambda:

- Gets the github_event_type from header (issue, pull_request etc.) and github_event_data from body of the payload.
- Preprocess the every event type as they have different structures and different types of data is needed for different event_types.
- It also gets the appropriate DynamoDB table name and lambda name using github_event_type.
- Calls the logger to log the event in appropriate DynamoDB Table.
- Calls the appropriate lambda to handle the particular event_type.

###### Event_Handler_Lambda:

- **Issues_Event_Handler_Lambda:**
  - **Handles different** **types of** **issues events:**
    - **1.** Opened  **||**  **2.** Assigned  **||**  **3.** Opened and Assigned simultaneous 
    - **4.** More than 3 issue assigned needs reconsideration
    - **5.** Unassigned  **||**  **6.** Edited-title  **||**  **7.** Edited-Body 
    - **8.** Closed  **||**  **9.** Reopened  **||**  **10.** Labeled  **||**  **11.** Unlabeled 
    - **12.** Milestoned  **||  13.** Demilestoned  **||  14.** Pinned  **||  15.** Unpinned 
    - **16.** Transferred (Bug in GitHub after tarnser assignee shows in site but doensn't in api response)
    - **17.** Deleted
- **Pull_Request_Event_Handler_Lambda:**
  - **Handles different** **types of** **pull_request events:**
    - **1.** Opened  **||**  **2.** Review_Requested  **||**  **3.** Opened and Review_Requested simultaneous  **||** 
    - **4.** More than 3 Pull_Request review requests needs reconsideration  **||** 
    - **5.** Review_Requested_Removed  **||**  **6.** Assigned  **||**  **7.** Unassigned  **||** 
    - **8.** Edited-title  **||**  **9.** Edited-Body  **||**  **10.** Merged & Closed  **||** 
    - **11.** Closed without merging  **||**  **12.** Reopened  **||**  **13.** Labeled  **||** 
    - **14.** Unlabeled 

###### Message_Sender_ Lambda:

- Sends the appropriate message to user associated with it through Slack.

#### Terraform (IAAC)

- **Modules:**
  - Common 
  - Events_Handlers 
  - Events_Logger
  - Message_Sender 
- **Stages:**
  - Local
  - Prod
  - Test

