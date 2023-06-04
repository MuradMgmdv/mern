import express from 'express';

import mongoose from 'mongoose';
import { registerValidation, loginValidation, postCreateValidation } from './auth.js';
import checkAuth from './middleware/checkAuth.js';
import { getMe, login, register } from './controllers/UserController.js';
import { create, getAll, getOne, remove } from './controllers/PostController.js';

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

app.post('/auth/login', loginValidation, login);

app.post('/auth/register', registerValidation, register);

// проверяем можем ли мы получить информацию о себе
app.get('/auth/me', checkAuth, getMe);

app.get('/posts', getAll);
app.get('/posts/:id', getOne);
app.post('/posts', checkAuth, postCreateValidation, create);
app.delete('/posts/:id', checkAuth, remove);
// app.patch('/auth/me', PostController.update);

app.listen(PORT, () => {
  console.log('Server ok!', PORT);
});
