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
* React.js 0.13.3 
* jquery
* a markdown third-party library
* a lot of love


### Developers tips 


Thanks to the react tools (install ``npm`` and ``react-tools``), the raw JS files will automatically be generated from your JSX files everytime your edit one.
Type in the terminal in the ``reactjs`` folder
```
jsx --watch src/ build/
```