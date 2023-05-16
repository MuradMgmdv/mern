import express from 'express';
import jwt from 'jsonwebtoken';
const app = express();

const PORT = 3001;

// для того чтобы бэк смог прочитать json который придет с фронта
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world!!!');
});

app.post('/auth/login', (req, res) => {
  //   console.log(req.body);

  // генерируем токен, зашифровываем значения которые нам пришлет пользователь
  const token = jwt.sign(
    {
      email: req.body.email,
      fullName: 'Дональд Трамп',
    },
    'secret123',
  );
  res.json({
    success: true,
    token,
  });
});

app.listen(PORT, () => {
  console.log('Server ok!', PORT);
});
