import { productResolvers } from "./products";
import { usersResolvers } from "./users";

export interface IResolvers {
  [key: string]: {
    [key: string]: (
      parent: any,
      args: any,
      context: any,
      info: any
    ) => any;
  };
}

export const resolvers: IResolvers = {
  Query: {
    ...productResolvers.Query,
  },

  Mutation: {
    ...usersResolvers.Mutation,
    ...productResolvers.Mutation,
  },
};
