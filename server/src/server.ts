import express, { Express } from 'express';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import router from './router';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cookieParser());
app.use(router)

app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server listening on port ${process.env.PORT || 5000}`);
})