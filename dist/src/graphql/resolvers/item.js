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
const Item = require('../../models/Item');
module.exports = {
    Query: {
        getItems: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const item = yield Item.find().populate('category');
                return item;
            }
            catch (err) {
                throw err;
            }
        }),
        //find items by categoryId
        getItemsByCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const item = yield Item.find({ category: args.categoryId }).populate('category');
                return item;
            }
            catch (err) {
                throw err;
            }
        }),
        //get item by ID
        getItem: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const item = yield Item.findById(args.itemId).populate('category');
                return item;
            }
            catch (err) {
                throw err;
            }
        })
    },
    Mutation: {
        addItem(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const newItem = new Item({
                    category: args.itemInput.category,
                    name: args.itemInput.name,
                    price: args.itemInput.price,
                    cost: args.itemInput.cost,
                    sku: args.itemInput.sku,
                    barcode: args.itemInput.barcode,
                    stock: args.itemInput.stock,
                    image: args.itemInput.image,
                });
                const item = yield newItem.save();
                const result = yield Item.findById(item._id).populate('category');
                return result;
            });
        },
        updateItem(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const item = yield Item.findById(args.itemId).populate('category');
                if (item) {
                    item.category = args.itemInput.category;
                    item.name = args.itemInput.name;
                    item.price = args.itemInput.price;
                    item.cost = args.itemInput.cost;
                    item.sku = args.itemInput.sku;
                    item.barcode = args.itemInput.barcode;
                    item.stock = args.itemInput.stock;
                    item.image = args.itemInput.image;
                    yield item.save();
                    return item;
                }
                else {
                    throw new Error('Item not found');
                }
            });
        },
    }
};
