# Project-2

Family Manager

- User
    - Parent (admin)
    - Child
- To do list
    - Table view 
        - Task, date, who assign to (family member)
- Finance
    - montly spending
    - subscription

    `Product`

  * `id`
  
    * Integer.
  
    * Doesn't allow null values.
  
    * Set as primary key.
  
    * Uses auto increment.

  * `Subscription`
  
    * Integer.
  
    * Doesn't allow null values.

  * `Bonus`
  
    * integer.
  
    * Doesn't allow null values.
  

- Project
    - View a section of the to do list base on the project category

Task
- id
    - primary key
- task title
- task description
- assigned to
    - user_id
    - foreign key
- created by
    - user_id
    - foreign key
- due date
- project_id
    - foreign key

Project
- id
- title
- due date (optional)
    - can be null

User
- id
- name
- family type
- date of birth