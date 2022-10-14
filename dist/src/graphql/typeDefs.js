"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
module.exports = (0, apollo_server_express_1.gql) `
  scalar upload

  scalar Date

  type File {
    url: String!
  }
  
  type Tax {
    name: String!
    value: Float!
  }

  type BuyMoreAndSaveDiscount {
    _id: ID!
    item: Item!
    buy: Int!
    saveValue: Int!
    activated: Boolean!
  }

  input BuyMoreAndSaveDiscountInput {
    item: ID!
    buy: Int!
    saveValue: Int!
    activated: Boolean!
  }

  type SaveMoreDiscount {
    _id: ID!
    items: [Item]!
    title: String!
    buy: Int!
    saveValue: Int!
    activated: Boolean!
  }

  input SaveMoreDiscountInput {
    items: [ID!]!
    title: String!
    buy: Int!
    saveValue: Int!
    activated: Boolean!
  }


  type Receipt {
    _id: ID!
    cashier: User
    total: Float
    items: [ReceiptItems]
    cash: Float
    change: Float
    receiptnumber: Int
    shop: Shop
    date: Date
    time: Date
    tax: Tax
    discount: Int
    paymentmethod: PaymentMethod
    referencenumber: String
  }

  type ReceiptItems {
    itemId: ID!
    item: String!
    quantity: Int
    price: Float
    discount: [ID]
  }

  type Category {
    _id: ID!
    categoryName: String
  }

  type PaymentMethod {
    _id: ID
    name: String
  }

  type CartItems {
    _id: ID!
    itemId: ID!
    item: String!
    quantity: Int
    price: Float
    discount: [ID]
  }

  type Cart {
    _id: ID
    user: User
    items: [CartItems]
  }

  type Shop {
    _id: ID
    name: String
    address: String
  }

  type Item {
    _id: ID!
    name: String
    category: Category
    price: Float
    cost: Float
    sku: String
    barcode: String
    stock: Int
    image: String
  }

  input LoginInput {
    email: String
    password: String
  }

  input ItemInput {
    category: String
    name: String
    price: Float
    cost: Float
    sku: String
    barcode: String
    stock: Int
    image: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    cart: Cart
    token: String!
    role: String
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    email: String!
  }

  input CategoryInput {
    categoryName: String
  }

  input ShopInput {
    name: String
    address: String
  }

  input PaymentMethodInput {
    name: String
    image: String
  }

  input ReceiptItemsInput {
    itemId: ID
    item: String
    quantity: Int
    price: Float
    discount: ID
  }

  input ReceiptInput {
    total: Float
    items: [ReceiptItemsInput]
    cash: Float
    paymentmethod: ID
    referencenumber: String
  }

  type Query {
    getCategory: [Category]
    getItems: [Item]
    getItemsByCategory(categoryId: ID!): [Item]
    getItem(itemId: ID!): Item
    user(id: ID!): User
    viewer: User!
    paymentMethods: [PaymentMethod]
    paymentMethod(paymentMethod: String): PaymentMethod
    shops: [Shop]
    hello: String
    receipts: [Receipt]
    receipt(receiptId: ID!): Receipt
    getCart(userId: ID!): Cart
    getTotal: Float
    getBMSDiscounts: [BuyMoreAndSaveDiscount]
    getBMSDiscount(discountId: ID!): BuyMoreAndSaveDiscount
    getSMDiscounts: [SaveMoreDiscount]
    numberOfItemsInCart: Int
    viewDiscountedItems(discountId: ID!): [Item]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    addCategory(categoryInput: CategoryInput): Category!
    addItem(itemInput: ItemInput): Item!
    updateItem(itemId: ID!, itemInput: ItemInput): Item!
    login(loginInput: LoginInput): User
    addPaymentMethod(paymentMethodInput: PaymentMethodInput): PaymentMethod
    addShop(shopInput: ShopInput): Shop
    singleUpload(file: upload!): File!
    receipt(receiptInput: ReceiptInput): Receipt
    addToCart(cartInput: ID): Cart
    removeFromCart(cartInput: ID): Cart
    removeFromCartDiscount(cartInput: ID): Cart
    addBMSDiscount(discountInput: BuyMoreAndSaveDiscountInput): BuyMoreAndSaveDiscount
    createSMDiscount(discountInput: SaveMoreDiscountInput): SaveMoreDiscount
    addSMDItem(discountId: ID!, item: ID!): SaveMoreDiscount
    addDiscountedItemToCart(item: ID!): Cart
  }
`;
