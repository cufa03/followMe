import { Request, Response } from 'express';
import { comparePassword, hashPassword } from '../utils/auth';
import slugify from 'slugify';
import UserModel from '../models/User';
import { generateJWT } from '../utils/jwt';
// import slug from 'slug';

export const getUsers = async (req: Request, res: Response) => {
  const users = await UserModel.find();
  res.send(users);
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
  res.send('User loged succesfully...');
};
