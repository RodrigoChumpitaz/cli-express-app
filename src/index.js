import inquirer from "inquirer";
import path from "path"
import { fileURLToPath } from "url"
import { createProjectStructure } from "./utils/projectStructure.js"


const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)

function promptUser() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'Project name: ',
            validate: (input) => {
            if (!input) {
                return 'Debes proporcionar un nombre para el proyecto.';
            }
            return true;
            },
            default: 'express-project',
        },
        {
            type: 'confirm',
            name: 'useDatabase',
            message: 'Do you want to use a database in your project?',
            message: 'Database (Y / N): ',
        },      
        {
            type: 'list',
            name: 'Database',
            message: 'Database: ',
            choices: ['MongoDB', 'MySQL', 'PostgreSQL', 'SQLite'],
            default: 'MongoDB',
            when: (answers) => answers.useDatabase === true,
        }
    ])
    .then((answers) => {
        const projectName = answers.projectName;
        createProjectStructure(projectName, __dirname, answers.useDatabase);
    });
}

promptUser();