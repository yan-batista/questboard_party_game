import express, { Express } from 'express';
import dotenv from 'dotenv';
import router from './router';

dotenv.config();
const app: Express = express();
app.use(express.json());
app.use(router)

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server listening on port ${process.env.PORT || 5000}`);
})