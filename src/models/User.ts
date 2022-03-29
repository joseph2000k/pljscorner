import {Schema, model} from "mongoose";

export interface RegisterInput {
  username: string;
  password: string;
  email: string;
  createdAt: string;
}

const UserSchema = new Schema<RegisterInput>({
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
