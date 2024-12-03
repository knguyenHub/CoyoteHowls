import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import * as functions from './functions/index.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/test', functions.test);
app.post('/login', functions.login);
app.post('/register', functions.register);
app.get('/signout', functions.signout);

app.listen(3001, () => {
    console.log('Server running on port 3001');
}
);

