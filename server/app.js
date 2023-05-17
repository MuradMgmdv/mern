import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

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
