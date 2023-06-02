import express from 'express';

import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';
import checkAuth from './middleware/checkAuth.js';
import { getMe, login, register } from '../client/controllers/UserController.js';

mongoose
  .connect(
    'mongodb+srv://muraddevmag:Tamik200@cluster0.7xg2y6k.mongodb.net/blog?retryWrites=true&w=majority',
  )
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error'));

const app = express();
const PORT = 3001;

// для того чтобы бэк смог прочитать json который придет с фронта
app.use(express.json());

app.post('/auth/login', login);

app.post('/auth/register', registerValidation, register);

// проверяем можем ли мы получить информацию о себе
app.get('/auth/me', checkAuth, getMe);

app.listen(PORT, () => {
  console.log('Server ok!', PORT);
});
