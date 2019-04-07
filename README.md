## Fancy Todo
Build with express,
Bootstrap, jQuery, RESTful API.

### List of user routes:

| Routes        | HTTP           | Header(s) | Body| Description |
| ------------- |:-------------:| :-----:| ---- | --- |
| /login | POST | none | google-token | login via email| 
| /google-login | POST | none | {id:String, password:String} | login via googles | 
### List of task routes: 
| Routes        | HTTP           | Header(s) | Body| Description |
| ------------- |:-------------:| :---:| ---- | --- | 
| /task | GET | token:String | none | Get all the task of specific user |  
| /task | POST | token:String | name:String  <br>dueDate:String <br>description:String  <br> | Create a new todo| 
| /task | DELETE | none | _id:String | Delete a todo based on _id | 
| /task | PATCH | none | _id:String | Update a task to complete status | 
| | | | | | 

<!-- ### List of filter routes:
| Routes        | HTTP           | Description |
| ------------- |:-------------:| :-----:| 
| /users?name=<KEYWORD> | GET | Get users by name | 

<br> -->


## Usage
Make sure Node.js is installed in your computer then run these commands:

> `$ npm install` <br>
> `$ npm start` <br>
> `$ npm run dev` <br>
