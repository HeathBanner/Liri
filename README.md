# Liri

Liri a command line based program that takes in two arguments (task, search) using Node.js and NPM packages (Moment, Axios, Node-Spotify-API, File-System)

# **All possible task arguments:**

The 'song' argument guides the 'search' argument in to the Node-Spotify-API 

The 'band' argument guides the 'search' argument in to the Axios function that searches the 'Bands In Town' API

The 'movie' argument guides the 'search' argument in to the Axios function that searches the 'OMDB' API

The 'do' argument fires off the 'File-System' function that begins to read the 'random.txt' file provided, then uses conditionals to determine the first and second argument.


# **All possible search arguments**

The 'search' argument is based on what you'd like to search relevant to the 'task' argument.


# **Example**

![Example 1](./assets/imgs/liriex1.png "Command typed out with proper arguments")


![Example 2](./assets/imgs/liriex2.png "Command ran without errors")


![Example 3](./assets/imgs/liriex3.png "Inside of the log.txt file")


## **NPM Packages**

[Moment](http://momentjs.com/docs/)

[Axios NPM](https://www.npmjs.com/package/axios)

[Node-Spotify-API NPM](https://www.npmjs.com/package/node-spotify-api)

[File-Sysyem NPM](https://www.npmjs.com/package/file-system)
