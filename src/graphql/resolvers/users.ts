const User = require('../../models/User');
const bcyrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
import { User as RegisterType} from "../../models/User";


module.exports = {
  Mutation: {
    async register(
      _: void,
      args: { registerInput:RegisterType},
    ) {

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
  },
};
