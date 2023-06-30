import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://ihor-admin:m8l3j6bUq2u9Dpm1@cluster0.7gsk9lg.mongodb.net/?retryWrites=true&w=majority"
  )
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
