import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; // библиотека которая шифрует пароль
import mongoose from 'mongoose';
import { validationResult } from 'express-validator'; // проверка корректную ли информацию отправил нам пользователь
import { registerValidation } from './validations/auth.js';
import UserModel from './models/User.js';

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

app.post('/auth/register', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req); // вытаскиваем все ошибки из запроса
    if (!errors.isEmpty()) {
      // если есть ошибки то возврашаем ответ 400 и возвращаем все ошибки которые смогли проваледировать
      return res.send(400).json(errors.array());
    }

    // шифруем пароль
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // создание пользователя
    const doc = new UserModel({
      email: req.body.email, // передаем в email данные, которые придут с req.body
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    // передаем данные пользователя в переменную user, которого создали в mongoDB и сохранили при помощи -save
    const user = await doc.save();

    // создаем токен
    const token = jwt.sign(
      {
        _id: user._id, // шифруем id
      },
      'secret123', // ключ secret123 для токена
      {
        expiresIn: '30d', // указываем сколько будет жить токен, указал срок 30 дней
      },
    );

    const { passwordHash, ...userData } = user._doc; // для того чтобы пароль не сохранялся в ответе json, вытаскиваем его оттуда

    // и возвращаем информацию о пользователе в виде json
    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Не удалось зарегистрироваться' });
  }
});

app.listen(PORT, () => {
  console.log('Server ok!', PORT);
});
