# Gateways Project

This is a project that allows the storage, creation, update and deletion of gateway devices. It uses mongoBD as a database to store gateways and its associated peripherals.


## Getting Started
To get you started you can simply clone the repository:

```
git clone https://github.com/tonysantana1492/gateways-backend
```
and install the dependencies
```
npm install
```

### Prerequisites
You need create a .env file that contains the variable:

    - PORT: Port to running your server.
    - DB_URL: URI to connect to mongoDb database.

#### MongoDB
The project uses MongoDB as a database. You need install and start the Mongo server.

### Run the Application

The project is preconfigured with a simple development web server. The simplest way to start this server is:

    npm start

### Project Structure

"**/node_modules**": It contains all the node modules needed to run the application.

"**/src/controllers**": It contains the logic for the CRUD.

"**/middlewares**": It contains all validations of the data.

"**/models**": It contains ours models that need mongoose for work.

"**/src/routes**": Basically we're requiring our Express functionality, then attaching a "router" variable to Express's router method, then using that method when an attempt is made to HTTP get the top level directory of our website. Finally we export our router function back to our app.

"**/src/test**": Contains all the tests of the application.

"**README.md**": This file.

"**/src/app.js**": It contains our server express, main configurations and security.

"**/src/server.js**": This is where activates our server and creates the connection with the database.
 