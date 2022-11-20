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
You need git to clone the repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

A number of node.js tools is necessary to initialize and test the project. You must have node.js and its package manager (npm) installed. You can get them from  [http://nodejs.org/](http://nodejs.org/). The tools/modules used in this project are listed in package.json and include express and mongoose.

#### MongoDB
The project uses MongoDB as a database. If you are on Mac and using Homebrew package manager the installation is as simple as `brew install mongodb`.

### Start the MongoDB server
First we need to create the `db` directory where the database files will live in. In your terminal navigate to the `root` of your system by doing `cd ..` until you reach the top directory. You can create the directory by running `sudo mkdir -p /data/db`. Now open a different tab in your terminal and run `mongod` to start the Mongo server.

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
 