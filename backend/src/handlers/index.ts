import { Request, Response } from 'express';
import { comparePassword, hashPassword } from '../utils/auth';
import slugify from 'slugify';
import formidable from 'formidable';
import { v4 as uuid } from 'uuid';
import UserModel from '../models/User';
import { generateJWT } from '../utils/jwt';
import cloudinary from '../config/cloudinary';

// import slug from 'slug';
// process.loadEnvFile();

export const getUsers = async (req: Request, res: Response) => {
  const users = await UserModel.find();
  res.send(users);
};

export const getUser = async (req: Request, res: Response) => {
  // console.log('From router/getUser');
  res.send(req.user);
};

export const createAccount = async (req: Request, res: Response) => {
  // Error handle, check if the field are completed
  //if every field is completed then checks if the email and the handle are already registered
  const { email, password } = req.body;
  const userExist = await UserModel.findOne({ email });
  if (userExist) {
    const error = new Error('Email already in use...');
    res.status(409).json({ error: error.message });
    return;
  }
  const handle = slugify(req.body.handle, '');
  const handleExist = await UserModel.findOne({ handle });
  if (handleExist) {
    const error = new Error('Username already in use...');
    res.status(409).json({ error: error.message });
    return;
  }
  const hash = await hashPassword(password);
  //Ona way to save a new user into the database
  // await UserModel.create(req.body);
  //Other way to store data
  const user = new UserModel(req.body);
  user.password = hash;
  user.handle = handle;
  await user.save();
  res.status(201).send(`User: ${req.body.name}. Succesfully created`);
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    const error = new Error(`The user doesn't exist`);
    res.status(404).json({ error: error.message });

    return;
  }
  const passwordMatch = await comparePassword(password, user.password);
  if (!passwordMatch) {
    const error = new Error('Wrong password');
    res.status(401).json({ error: error.message });
    return;
  }
  const token = generateJWT({ id: user._id });
  // console.log('token: ', token);
  // res.send('User loged succesfully...');
  res.send(token);
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { description, links } = req.body;

    const handle = slugify(req.body.handle, '');
    const handleExist = await UserModel.findOne({ handle });
    if (handleExist && handleExist.email !== req.user.email) {
      const error = new Error('Username already in use...');
      res.status(409).json({ error: error.message });
      return;
    }

    // Update user info
    req.user.description = description;
    req.user.handle = handle;
    req.user.links = links;
    await req.user.save();
    res.send('User information updated succesfully');
  } catch (err) {
    const error = new Error('Something went wrong');
    res.status(500).json({ error: error.message });
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  const form = formidable({ multiples: false });

  try {
    form.parse(req, (error, fields, files) => {
      cloudinary.uploader.upload(
        files.file[0].filepath,
        { public_id: uuid() },
        async function (error, result) {
          if (error) {
            const error = new Error('Something went wrong uploading image');
            res.status(500).json({ error: error.message });
          }
          if (result) {
            req.user.image = result.secure_url;
            await req.user.save();
            res.json({ image: result.secure_url });
          }
        }
      );
    });
  } catch (err) {
    const error = new Error('Something went wrong');
    res.status(500).json({ error: error.message });
  }
};
