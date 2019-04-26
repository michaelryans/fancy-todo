## Fancy Todo
Build with express,
Bootstrap, jQuery, RESTful API.

### List of user routes:

| Routes        | HTTP           | Header(s) | Body| Description | Success | Error|
| ------------- |:-------------:| :-----:| ---- | --- | ---| ---|
| /login | POST | none | {id:String, password:String} | login via email| Status: 200 <br> dataTypes:{} | Status:401 <br> dataTypes:{}
| /google-login | POST | none | google-token | login via googles | Status : 201/200 <br> Datatypes: {} | Status: 500, dataTypes: {}
| / user | POST | none | {email: String, <br> name:String, <br> password:String, <br> confirmPassword:String}<br> | Register via Email | Status: 201 <br> Datatypes: {} | Status : 500 <br> Datatypes: {}


### List of task routes: (User need to be signed in to access the routes)
| Routes        | HTTP           | Header(s) | Body| Description | Success | Error
| ------------- |:-------------:| :---:| ---- | --- | --- | ---|
| /task | GET | token:String | none | Get all the task of specific user | Status:200<br>dataTypes:{} | Status:500<br> dataTypes: {} |  
| /task | POST | token:String | name:String  <br>dueDate:String <br>description:String  <br> | Create a new todo| Status:200<br>dataTypes:{} | Status:500<br> dataTypes: {} |  
| /task | DELETE | none | _id:ObjectId/String | Delete a todo based on _id | Status:200<br>dataTypes:{} | Status:500<br> dataTypes: {} |  
| /task | PATCH | none | _id:ObjectId/String | Update a task to complete status | Status:200<br>dataTypes:{} | Status:500<br> dataTypes: {} |  
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



## How this Todo Work
* The task form is required to be filled. If the client is bypassed, then the date will be set 1 day after current date.
* User must be logged in to view task.
* The data will be saved on database.