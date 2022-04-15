import {Schema, model} from "mongoose";

export interface IUser {
  username: string;
  password: string;
  email: string;
  createdAt: string;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  createdAt: {
    type: String,
  },
});

const User = model<IUser>('User', UserSchema);

module.exports = User;
