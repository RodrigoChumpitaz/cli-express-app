export const packageTemplate = (projectName) =>  {     
return`{
    "dependencies": {
        "express": "^4.18.2",
        "morgan": "^1.10.0"
    },
    "devDependencies": {
        "nodemon": "^3.0.1"
    },
    "name": "${projectName}",
    "version": "1.0.0",
    "main": "index.js",
    "type": "module",
    "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "description": ""
}
        `;}