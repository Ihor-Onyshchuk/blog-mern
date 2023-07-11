import { body } from 'express-validator';

export const loginValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
];

export const registerValidation = [
  body('email', 'porvide correct email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('fullName').isLength({ min: 3 }),
  body('avatarUrl').optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'Specify the title of the publication')
    .isLength({ min: 3 })
    .isString(),
  body('text', 'Add publication text').isLength({ min: 3 }).isString(),
  body('tags', 'Provide some tags').optional().isString(),
  body('imageUrl', 'Invalid image link').optional().isString(),
];
