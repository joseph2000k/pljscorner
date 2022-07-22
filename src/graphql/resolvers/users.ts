const User = require('../../models/User');
const bcyrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
import { User as UserType} from "../../models/User";


module.exports = {
    Query: {
        user: async (_: void, args:{id: string}, {user}: any) => {
            try {
                const currentUser = await User.findById(args.id).select('-password');
                if(currentUser.id !== user.id) {
                    return new Error('Not Authorized!!!');
                }
                return currentUser;
            } catch (err) {
                throw err;
            }
        },
        viewer: async (_:void, args: void, {user}:any) => {
            try {
              const currentUser = await User.findById(user.id);
            return currentUser;
            } catch (error) {
              throw error;
            }
        }
    },
  Mutation: {
    async register(
      _: void,
      args: { registerInput:UserType}
    ) {

      const userExists = await User.findOne({
        email: args.registerInput.email,
      });

      if (userExists) {
        throw new Error('User already exists');
      }

      const password = await bcyrpt.hash(args.registerInput.password, 12);

      const newUser = new User({
        username: args.registerInput.username,
        email: args.registerInput.email,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res._id,
          username: res.username,
          email: res.email,
        },
        config.get('jwtSecret'),
        { expiresIn: '24h' }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    async login(_: void, args: { loginInput: { email: string; password: string } }) {
      const user = await User.findOne({ email: args.loginInput.email });

      if (!user) {
        throw new Error('User does not exist');
      }

      const isEqual = await bcyrpt.compare(
        args.loginInput.password,
        user.password,
      );

      if (!isEqual) {
        throw new Error('Password is incorrect');
      }

      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        config.get('jwtSecret'),
        {algorithm: 'HS256', expiresIn: '1h' }
      );

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    }
  },
};
