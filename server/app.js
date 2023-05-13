import express from 'express';
const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world!!!');
});

app.post('/auth/login', (req, res) => {
  //   console.log(req.body);
  res.json({
    success: true,
  });
});

app.listen(PORT, () => {
  console.log('Server ok!', PORT);
});
