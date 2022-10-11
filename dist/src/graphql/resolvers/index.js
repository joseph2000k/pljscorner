"use strict";
const categoryResolvers = require("./category");
const usersResolvers = require("./users");
const itemResolvers = require("./item");
const paymentmethodResolvers = require("./paymentmethod");
const shopResolvers = require("./shop");
const uploadResolvers = require("./uploadFile");
const receiptResolvers = require("./receipt");
const cartResolvers = require("./cart");
const buymoreandsavediscount = require("./buymoreandsavediscount");
const savemorediscountResolvers = require("./savemorediscount");
module.exports = {
    Query: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, categoryResolvers.Query), itemResolvers.Query), usersResolvers.Query), paymentmethodResolvers.Query), shopResolvers.Query), uploadResolvers.Query), receiptResolvers.Query), cartResolvers.Query), buymoreandsavediscount.Query), savemorediscountResolvers.Query),
    Mutation: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, usersResolvers.Mutation), categoryResolvers.Mutation), itemResolvers.Mutation), paymentmethodResolvers.Mutation), shopResolvers.Mutation), uploadResolvers.Mutation), receiptResolvers.Mutation), cartResolvers.Mutation), buymoreandsavediscount.Mutation), savemorediscountResolvers.Mutation),
};
