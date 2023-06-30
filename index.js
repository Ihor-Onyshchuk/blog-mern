import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import 'dotenv/config';

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('db ok');
  })
  .catch((err) => {
    console.log('db err', err);
  });

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send('Hello there!');
});

app.post('/auth/login', (req, res) => {
  console.log(req.body);

  const token = jwt.sign({
    email: req.body.email,
    fullName: 'Marty McFly'
  }, 'secretKey123');

  res.json({
    success: true,
    token,
  });
})

app.listen(8080, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server is running!');
});
