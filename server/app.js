import express from 'express';
import multer from 'multer';
import cors from 'cors';

import mongoose from 'mongoose';
import { registerValidation, loginValidation, postCreateValidation } from './auth.js';
import checkAuth from './middleware/checkAuth.js';
import { getMe, login, register } from './controllers/UserController.js';
import { create, getAll, getOne, remove, update } from './controllers/PostController.js';
import handleValidationErrors from './middleware/handleValidationErrors.js';

mongoose
  .connect(
    'mongodb+srv://muraddevmag:Tamik200@cluster0.7xg2y6k.mongodb.net/blog?retryWrites=true&w=majority',
  )
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error'));

const app = express();
const PORT = 3001;

// хранилище где будем сохранять все картинки
const storage = multer.diskStorage({
  // когда будет любой файл загружаться, будет выполняться функция которая вернет путь этого файла
  destination: (_, __, cb) => {
    cb(null, 'uploads'); // объясняем что файлы эта функция будет сохранять в папку 'uploads'
  },
  // перед тем как этот файл сохранить, функция объяснит как называть этот файл
  filename: (_, file, cb) => {
    // 'file' название файла будет передаваться при загрузки
    cb(null, file.originalname); // объясняем что из файла хотим вытащить оригинальное название'
  },
});

const upload = multer({ storage }); // для того чтобы работала с express

// для того чтобы бэк смог прочитать json который придет с фронта
app.use(express.json());
app.use(cors());
// мидлвара которая проверяет, если придет запрос на /uploads, то отправляет запрос на папку uploads и в ней ищет файл, который я пытаюсь загрузить
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation, handleValidationErrors, login);

app.post('/auth/register', registerValidation, handleValidationErrors, register);

// проверяем можем ли мы получить информацию о себе
app.get('/auth/me', checkAuth, getMe);

// загрузка файлов
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get('/posts', getAll);
app.get('/posts/:id', getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, create);
app.delete('/posts/:id', checkAuth, remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, update);

app.listen(PORT, () => {
  console.log('Server ok!', PORT);
});
