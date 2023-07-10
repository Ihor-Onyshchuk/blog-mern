import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

import checkAtuh from './utils/checkAtuh.js';
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from './validations.js';
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

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

// auth
app.get('/auth/me', checkAtuh, UserController.getMe);
app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);

// posts
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAtuh, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAtuh, PostController.remove);
app.patch('/posts/:id', checkAtuh, PostController.update);

app.listen(8080, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server is running!');
});
