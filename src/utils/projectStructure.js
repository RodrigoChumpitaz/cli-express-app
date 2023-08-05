import fs from "fs"
import path from "path"
import { promisify } from "util"
import { packageTemplate } from "../templates/package.js"


const mkdir = promisify(fs.mkdir)
const writeFile = promisify(fs.writeFile)

export async function createProjectStructure(projectName, __dirname, database){
    const projectDir = path.join(__dirname, projectName)

    try {
        await mkdir(projectDir);
        await mkdir(path.join(projectDir, 'src'));

        await mkdir(path.join(projectDir, 'src', 'models'));
        await mkdir(path.join(projectDir, 'src', 'routes'));
        await mkdir(path.join(projectDir, 'src', 'controllers'));
        await mkdir(path.join(projectDir, 'src', 'public'));
        await mkdir(path.join(projectDir, 'src', 'config'));

        await writeFile(path.join(projectDir, 'src', 'public', 'index.html'), fs.readFileSync(path.join(__dirname, 'templates', 'index.html'), 'utf8'));
        await writeFile(path.join(projectDir, 'src', 'public', 'main.css'), fs.readFileSync(path.join(__dirname, 'templates', 'styles', 'main.css'), 'utf8'));

        await writeFile(path.join(projectDir, 'src', 'config', 'database.js'), fs.readFileSync(path.join(__dirname, 'templates', 'config', 'database.js'), 'utf8'));
        await writeFile(path.join(projectDir, 'src', 'models', 'Permission.js'), fs.readFileSync(path.join(__dirname, 'templates', 'model', 'permission.js'), 'utf8'));
        await writeFile(path.join(projectDir, 'src', 'models', 'Role.js'), fs.readFileSync(path.join(__dirname, 'templates', 'model', 'role.js'), 'utf8'));
        await writeFile(path.join(projectDir, 'src', 'models', 'User.js'), fs.readFileSync(path.join(__dirname, 'templates', 'model', 'model.js'), 'utf8'));
        await writeFile(path.join(projectDir, 'src', 'controllers', 'user.controller.js'), fs.readFileSync(path.join(__dirname, 'templates', 'common', 'controller.js'), 'utf8'));
        await writeFile(path.join(projectDir, 'src', 'routes', 'user.routes.js'), fs.readFileSync(path.join(__dirname, 'templates', 'common', 'routes.js'), 'utf8'));

        await writeFile(path.join(projectDir, '.env'), fs.readFileSync(path.join(__dirname, 'templates', 'config', '.env'), 'utf8'));
        await writeFile(path.join(projectDir, 'src', 'index.js'), fs.readFileSync(path.join(__dirname, 'templates', 'server', 'index.js'), 'utf8'));
        await writeFile(path.join(projectDir, 'package.json'), packageTemplate(projectName, database));
    
        console.log(`
    Success! Created ${projectName} at ${projectDir},
    Please run the following commands to start:
    cd src/${projectName}
    npm install (or yarn)
    npm run dev (or yarn dev)
    
    visit http://localhost:3000 or http://localhost:3000/users to see the api working
    then you can start to code your project
        `);
    } catch (error) {
        console.error('Error al crear el proyecto:', error);
    }
}