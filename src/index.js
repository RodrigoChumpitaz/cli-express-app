import fs from "fs"
import path from "path"
import inquirer from "inquirer"
import { promisify } from "util"
import { fileURLToPath } from "url"
import { packageTemplate } from "./templates/package.js"


const mkdir = promisify(fs.mkdir)
const writeFile = promisify(fs.writeFile)
const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)

async function createProjectStructure(projectName){
    const projectDir = path.join(__dirname, projectName)

    try {
        await mkdir(projectDir);
        await mkdir(path.join(projectDir, 'routes'));
        await mkdir(path.join(projectDir, 'controllers'));
        await mkdir(path.join(projectDir, 'public'));

        // crear archivos dentro de "public"
        await writeFile(path.join(projectDir, 'public', 'index.html'), fs.readFileSync(path.join(__dirname, 'templates', 'index.html'), 'utf8'));
        await writeFile(path.join(projectDir, 'public', 'main.css'), fs.readFileSync(path.join(__dirname, 'templates', 'styles', 'main.css'), 'utf8'));

        // Crear archivo index.js
        await writeFile(path.join(projectDir, 'index.js'), fs.readFileSync(path.join(__dirname, 'templates', 'server', 'index.js'), 'utf8'));
        await writeFile(path.join(projectDir, 'package.json'), packageTemplate(projectName));
    
        console.log(`
        Success! Created ${projectName} at ${projectDir},
        Please run the following commands to start:
        cd ${projectName}
        npm install (or yarn)
        npm run dev (or yarn dev)
        `);
    } catch (error) {
        console.error('Error al crear el proyecto:', error);
    }
}


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
    ])
    .then((answers) => {
        const projectName = answers.projectName;
        createProjectStructure(projectName);
    });
}

promptUser();