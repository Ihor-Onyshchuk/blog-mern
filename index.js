import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

import checkAtuh from './utils/checkAtuh.js';
import { registerValidation } from './validations/auth.js';
import * as UserController from './controllers/UserController.js';

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

app.post('/auth/login', UserController.login);
app.get('/auth/me', checkAtuh, UserController.getMe);
app.post('/auth/register', registerValidation, UserController.register);

app.listen(8080, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server is running!');
});
