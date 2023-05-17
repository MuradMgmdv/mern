import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator'; // проверка корректную ли информацию отправил нам пользователь
import { registerValidation } from './validations/auth.js';

mongoose
  .connect(
    'mongodb+srv://muraddevmag:Tamik200@cluster0.7xg2y6k.mongodb.net/?retryWrites=true&w=majority',
  )
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error'));

const app = express();

const PORT = 3001;

// для того чтобы бэк смог прочитать json который придет с фронта
app.use(express.json());

app.post('/auth/register', registerValidation, (req, res) => {
  const errors = validationResult(req); // вытаскиваем все ошибки из запроса
  if (!errors.isEmpty()) {
    // если есть ошибки то возврашаем ответ 400 и возвращаем все ошибки которые смогли проваледировать
    return res.send(400).json(errors.array());
  }
  res.json({
    success: true,
  });
});

app.listen(PORT, () => {
  console.log('Server ok!', PORT);
});
