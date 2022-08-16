import express, {Express, json, Request, Response} from 'express';
import dotenv from 'dotenv';
import secretRouter from "./src/routes/Secret.route"
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import cors from 'cors';

dotenv.config({path: __dirname + '/../.env'});
const app: Express = express();
const port = process.env.PORT

app.use(cors({
    origin: "*",
}));
app.use(bodyParser.json());
app.use(json())
app.use('/v1', secretRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>It Works!</h1>');
});

mongoose
    .connect("mongodb://root:example@mongo:27017/")
    .then(() => {
        app.listen(port, () => {
            console.log(`[server]: Server is running at https://localhost:${port}`);
        });
    })