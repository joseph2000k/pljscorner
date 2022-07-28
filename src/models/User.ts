import {Schema, model} from "mongoose";
import { Cart } from "./Cart";

export interface User {
  username: string;
  password: string;
  email: string;
  cart: Cart;
  role: string;
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
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: String,
  },
});

const User = model('User', UserSchema);

module.exports = User;
