"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('../../models/User');
const Cart = require('../../models/Cart');
const bcyrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = {
    Query: {
        user: (_, args, { user }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const currentUser = yield User.findById(args.id).select('-password');
                if (!currentUser) {
                    return new Error('User Not Found');
                }
                return currentUser;
            }
            catch (err) {
                throw err;
            }
        }),
        viewer: (_, args, { user }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const currentUser = yield User.findById(user.id);
                return currentUser;
            }
            catch (error) {
                throw error;
            }
        })
    },
    Mutation: {
        register(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const userExists = yield User.findOne({
                    email: args.registerInput.email,
                });
                if (userExists) {
                    throw new Error('User already exists');
                }
                const password = yield bcyrpt.hash(args.registerInput.password, 12);
                const newUser = new User({
                    username: args.registerInput.username,
                    email: args.registerInput.email,
                    password,
                    createdAt: new Date().toISOString(),
                });
                const res = yield newUser.save();
                const newCart = new Cart({
                    user: res._id,
                });
                yield newCart.save();
                //add cart to user
                yield User.findByIdAndUpdate(res._id, {
                    cart: newCart._id,
                });
                const token = jwt.sign({
                    id: res._id,
                    username: res.username,
                    email: res.email,
                }, config.get('jwtSecret'), { expiresIn: '24h' });
                return Object.assign(Object.assign({}, res._doc), { id: res._id, token });
            });
        },
        login(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield User.findOne({ email: args.loginInput.email }); //.populate({path: 'cart', populate: {path: 'user'}});
                if (!user) {
                    throw new Error('User does not exist');
                }
                const isEqual = yield bcyrpt.compare(args.loginInput.password, user.password);
                if (!isEqual) {
                    throw new Error('Password is incorrect');
                }
                const token = jwt.sign({
                    id: user._id,
                    username: user.username,
                    email: user.email,
                }, config.get('jwtSecret'), { algorithm: 'HS256', expiresIn: '24h' });
                return Object.assign(Object.assign({}, user._doc), { id: user._id, token });
            });
        }
    },
};
