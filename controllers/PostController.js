import { populate } from 'dotenv';
import { validationResult } from 'express-validator';

import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate({ path: 'user', select: '-passwordHash' })
      .exec();

    res.json(posts);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: 'Can not get a posts!',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        new: true,
      }
    );

    if (!doc) {
      return res.status(404).json({
        message: 'Post not found!',
      });
    }

    res.send(doc);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: 'Can not get a post!',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await PostModel.findOneAndDelete({
      _id: postId,
    });

    if (!doc) {
      return res.status(404).json({
        message: 'Post not found!',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: 'Can not get a post!',
    });
  }
};

export const create = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: 'Post creation failed!',
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );

    if (!doc) {
      return res.status(404).json({
        message: 'Post updating failed!',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: 'Can not get a post!',
    });
  }
};
