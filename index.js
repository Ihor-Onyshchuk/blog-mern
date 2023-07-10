import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import 'dotenv/config';

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from './validations.js';
import { UserController, PostController } from './controllers/index.js';
import { checkAuth, handleValidationsErrors } from './utils/index.js';

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('db ok');
  })
  .catch((err) => {
    console.log('db err', err);
  });

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// auth
app.get('/auth/me', checkAuth, UserController.getMe);
app.post(
  '/auth/login',
  loginValidation,
  handleValidationsErrors,
  UserController.login
);
app.post(
  '/auth/register',
  registerValidation,
  handleValidationsErrors,
  UserController.register
);

// posts
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  handleValidationsErrors,
  PostController.create
);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationsErrors,
  PostController.update
);

// uploads
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.listen(8080, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server is running!');
});
