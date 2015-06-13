# monitweet

## What is it?

Supposedly a Twitter actions monitor. 


## What are the ingredients? 

It's propulsed by 
* backend: node.js / express
* templates: hogan-express
* front end: React.js 
* other dependencies in packages.json
* a lot of love


### Developers tips / Start your dev env

#### Start

Install all the depencies after you donwloaded the files with ``npm install``

Use ``nodemon -e js,html bin/www`` to start the application

Use react tools (install ``npm`` and ``react-tools``) to automatically build raw JS files from JSX files everytime your save them.
Type in the terminal in the ``reactjs`` folder
```
./node_modules/react-tools/bin/jsx --watch public/javascripts/src/ public/javascripts/build/
```

#### MongoDB 

* Instanciate the data/ folder that will contain the database at the root project level ``mkdir data``
* Run MongoDB (the mongodb folder should be before the root of the project and your terminal at the root of the project)
```
../mongodb/bin/mongod --dbpath data/
```

* If this is your first instanciation of the project, your need to setup the MongoDB database. Go in the terminal in the bin/ folder of your MongoDB installation and type the following to start the server ``./mongo``
```
use monitweettest1
db.usercollection.insert({ "username" : "testuser1", "email" : "testuser1@testdomain.com" })
newstuff = [{ "username" : "testuser2", "email" : "testuser2@testdomain.com" }, { "username" : "testuser3", "email" : "testuser3@testdomain.com" }]
db.usercollection.insert(newstuff)
db.usercollection.find()
```

#### Config File

Config file - you've got to create a ``config.js`` file at the root of your app with the following parameters
```
module.exports = {
  twitter: {
    consumer_key: 'yourCredentials',
    consumer_secret: 'yourCredentials',
    access_token_key: 'yourCredentials',
    access_token_secret: 'yourCredentials'
  }
}
```

