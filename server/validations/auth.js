import { body } from 'express-validator';

export const registerValidation = [
  body('email').isEmail(), // есть ли в body 'email' и я является ли он email
  body('password').isLength({ min: 5 }), // есть ли в body 'password' и чтобы он был длинее 5 символов
  body('fullName').isLength({ min: 3 }),
  body('avatarUrl').optional().isURL(), // есть ли в body 'avatarUrl' опционально, а если есть то проверяем является ли она URL
];
