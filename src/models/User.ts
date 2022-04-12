import {Schema, model} from "mongoose";

export interface User {
  username: string;
  password: string;
  email: string;
  createdAt: string;
}

const UserSchema = new Schema<User>({
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

const User = model('User', UserSchema);

module.exports = User;
