import mongoose, { Schema } from 'mongoose';

export interface InterfaceUser {
  handle: string;
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema({
  handle: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
});

const UserModel = mongoose.model<InterfaceUser>('User', userSchema);
export default UserModel;
