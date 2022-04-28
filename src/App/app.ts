import express, {Request, Response} from "express";
import index from '../index'; 
import userRouter from "../routes/user.router";
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(bodyParser.json());

app.use("/users", userRouter);

app.listen(index.port, () => console.log('App is listening on url http://localhost:' + index.port));
