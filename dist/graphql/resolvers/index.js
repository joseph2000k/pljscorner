"use strict";
const productResolvers = require("./products");
const usersResolvers = require("./users");
module.exports = {
    Query: Object.assign({}, productResolvers.Query),
    Mutation: Object.assign(Object.assign({}, usersResolvers.Mutation), productResolvers.Mutation),
};
