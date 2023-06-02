import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; // библиотека которая шифрует пароль
import { validationResult } from 'express-validator'; // проверка корректную ли информацию отправил нам пользователь
import UserModel from '../models/User.js';

export const register = async (req, res) => {
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
};

export const login = async (req, res) => {
  try {
    // ищем пользователя по email в базе данных
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }
    // если нашелся пользователь по email, проверяем сходится ли пароль
    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Неверный логин или пароль',
      });
    }
    // если email нашелся в базе данных и пароль корректный, то создаем токен
    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );

    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Не удалось авторизоваться' });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Нет доступа',
    });
  }
};
