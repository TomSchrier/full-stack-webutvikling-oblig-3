# OBLIGATORY ASSIGNMENT 3 IN IDG2100 - FULL-STACK WEB DEVELOPMENT

## HOW TO SETUP POSTMAN AND COMPASS
I used Postman v8.0.7 and MongoDB Compass V1.26.0 while developing. For installation follow the instructions on https://www.postman.com/downloads/ and https://www.mongodb.com/try/download/compass.

### POSTMAN
In the delivery folder, there is a JSON file (`full_stack_web_development_oblig_3.postman_collection.json`) that can be imported to Postman, this file includes all Postman queries used under development. I have included examples that make it easier to understand how to use each query.
I have created the following queries: 
 - GET Hompage
 - POST Signup
	 - Include name, surname, email, password, place, status in body (JSON)
 - POST log in
	 - Include email and password in body (JSON)
 - POST forgot password
	 - Include email in body (JSON)
 - GET all users (PRIVATE)
	 - Include '`secret_token`' in query params -> value = JWT
 - POST Add new user (PRIVATE)
	 - Include '`secret_token`' in query params -> value = JWT
	 - Include name, surname, email, password, place, status in body (JSON)
 - DELETE a user (PRIVATE)
	 - Include '`secret_token`' in query params -> value = JWT
	 - Include  email in body (JSON)
 - UPDATE a user (PRIVATE)
	 - Include '`secret_token`' in query params -> value = JWT
	 - Include name, surname, email, password, place, status, newEmail in body (JSON)

### COMPASS
After following the installation instructions make sure the localhost is set to 27017 and then press the green "connect" button on the MongoDB Compass home screen. My database in MongoDB is called "oblig3-users". When creating the first user via signup the MongoDB Compass will automatically create the database for you.
Optimally import the included `users.json` file. This will import all the users from the database used under development. These are perfect for testing. (The password for these fake users is 'password')

## KNOW BUGS/ISSUES
When a teacher updates the information of a user and tries to update multiple fields, the terminal in VS code might return some warnings. This is because the application is trying to respond multiple times.

## OTHER COMMENTS
I have decided to implement a controller folder to keep the logic and routes more separated. I think this makes the code clearer and easier to maintain. Further, I have separated "public" routes and their controller and the "private" routes and their controllers. I did this to keep a clear overview of which routes required authentication and which did not.
To implement role-based auhorization I encoded the user's role in their JWT. To decode it before giving access to a private route I created some middleware that runs before giving access. This function can be found in the auth.js file and is exported to index.js. This keep index.js clean because there are no function declaration in the file.

## Further improvements
For the next time, I would like to improve the code for when a teacher updates a user, and I would like to store the JWT somewhere else than the URL bar. I think displaying it in the URL can be a security problem.

## RESOURCES, INSPIRATION, AND COLLABORATIONS
### CODE
**Gerardo de La Riva**
Parts of the code are similar to the code provided by Gerardo de La Riva during the lectures. I have used codes from March 10th and March 17th.

### COLLABORATIONS
During the weekend of week 11, another student and I met up to work on the assignment together. We wrote our own code but helped each other when we didn't get the code to work. Because of this, some of our code might be similar. Due to the anonymous grading on BlackBoard, I cannot say who it is.

### RESOURCES
During development I have taken inspiration and methods from the links below, therefore, some of the code might be similar.

**How To Implement API Authentication with JSON Web Tokens and Passport (20.03.2021)**
https://www.digitalocean.com/community/tutorials/api-authentication-with-json-web-tokensjwt-and-passport

**How to implement role based authorization in Node.js using token based authentication? (20.03.2021)**
https://stackoverflow.com/q/53364187/14447555

**Role based authorization with express-jwt? (20.03.2021)**
https://stackoverflow.com/a/36340710/14447555

**In Node.js, how do I “include” functions from my other files? (20.03.2021)**
https://stackoverflow.com/q/5797852/14447555

**Mongoose, Select a specific field with find? (21.03.2021)**
https://stackoverflow.com/q/24348437/14447555