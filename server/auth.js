import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(), // есть ли в body 'email' и я является ли он email
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }), // есть ли в body 'password' и чтобы он был длинее 5 символов
];

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(), // есть ли в body 'email' и я является ли он email
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }), // есть ли в body 'password' и чтобы он был длинее 5 символов
  body('fullName', 'Укажите имя, не менее 3 символов').isLength({ min: 3 }),
  body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(), // есть ли в body 'avatarUrl' опционально, а если есть то проверяем является ли она URL
];
