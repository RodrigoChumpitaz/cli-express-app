export const packageTemplate = (projectName, database) =>  {     
return`{
    "dependencies": {
        "express": "^4.18.2",
        "morgan": "^1.10.0",
        "dotenv": "^16.3.1",
        ${database ? `"mongoose": "^5.12.0"` : ''}
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
        "dev": "nodemon src/index.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "description": ""
}
        `;}