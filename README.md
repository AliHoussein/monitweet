# monitweet

## What is it?

Supposedly a Twitter actions monitor. 

## How to use it

Simply launch a http server at the base directory
To do so easily type in the terminal:
```
python server.py
```

and voilà! you are up and runing at http://localhost:8000 
(be warry, the server is open to anyone on your network)


## What are the ingredients? 

It's propulsed by 
* backend: node.js / express
* templates: Hogan
* front end: React.js 
* other dependencies in packages.json
* a lot of love


### Developers tips 

Install all the depencies after you donwloaded the files with ``npm install``

Use ``nodemon bin/www`` to start the application

Use react tools (install ``npm`` and ``react-tools``) to automatically build raw JS files from JSX files everytime your save them.
Type in the terminal in the ``reactjs`` folder
```
./node_modules/react-tools/bin/jsx --watch public/javascripts/src/ public/javascripts/build/
```