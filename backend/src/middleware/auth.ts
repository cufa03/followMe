import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel, { InterfaceUser } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: InterfaceUser;
    }
  }
}
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    const error = new Error('Not authorized');
    res.status(401).json({ error: error.message });
  }
  const [, token] = bearer.split(' ');
  if (!token) {
    const error = new Error('Missing token');
    res.status(401).json({ error: error.message });
  }
  try {
    const result = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof result === 'object' && result.id) {
      const user = await UserModel.findById(result.id).select('-password');
      if (!user) {
        const error = new Error(`User doesn't exist`);
        res.status(404).json({ error: error.message });
      }
      req.user = user;
      next();
    }
    console.log(result);
  } catch (error) {
    res.status(500).json({ error: 'Invalid token' });
  }
};
