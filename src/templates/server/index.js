import express from "express";
import path from "path";
import morgan from "morgan";
import { fileURLToPath } from "url"

const app = express();
const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.render('index.html');
});

app.listen(3000, () => {
    console.log('Server on port 3000 :D');
});