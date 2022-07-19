const User = require('../../models/User');
const bcyrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
import { User as UserType} from "../../models/User";


module.exports = {
    Query: {
        user: async (_: void, args:{id: string}) => {
            try {
                const user = await User.findById(args.id);
                return user;
            } catch (err) {
                throw err;
            }
        }
    },
  Mutation: {
    async register(
      _: void,
      args: { registerInput:UserType},
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
        { expiresIn: '1h' }
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
        { expiresIn: '1h' }
      );

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    }
  },
};
