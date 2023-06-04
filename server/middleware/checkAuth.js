import jwt from 'jsonwebtoken';
// middleware которая чекает авторизованного пользователя
export default (req, res, next) => {
  // если есть авторизованный пользователь, вытаскиваем его токен и убираем заголов Bearer у токена
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret123'); // расшифровываем токен с помощью метода verify

      req.userId = decoded._id;
      next();
    } catch (err) {
      return res.status(403).json({
        message: 'Нет доступа',
      });
    }
  } else {
    return res.status(403).json({
      message: 'Нет доступа',
    });
  }
};
