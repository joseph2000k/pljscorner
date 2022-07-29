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
const bcyrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = {
    Mutation: {
        register(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const password = yield bcyrpt.hash(args.registerInput.password, 12);
                const newUser = new User({
                    username: args.registerInput.username,
                    email: args.registerInput.email,
                    password,
                    createdAt: new Date().toISOString(),
                });
                const res = yield newUser.save();
                const token = jwt.sign({
                    id: res._id,
                    username: res.username,
                    email: res.email,
                }, config.get('jwtSecret'), { expiresIn: '1h' });
                return Object.assign(Object.assign({}, res._doc), { id: res._id, token });
            });
        },
    },
};
