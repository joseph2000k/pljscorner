import { gql } from 'apollo-server-express';

module.exports = gql`
  type Category {
    _id: ID!
    name: String
  }

  type PaymentMethod {
    _id: ID
    name: String
  }

  type Cart {
    _id: ID
    user: User
    items: [Item]
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
    name: String
  }

  input PaymentMethodInput {
    name: String
    image: String
  }

  type Query {
    getCategory: [Category]
    getItem: [Item]
    user(id: ID!): User
    viewer: User!
    paymentMethods: [PaymentMethod]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    addCategory(categoryInput: CategoryInput): Category!
    addItem(itemInput: ItemInput): Item!
    login(loginInput: LoginInput): User
    addPaymentMethod(paymentMethodInput: PaymentMethodInput): PaymentMethod
  }
`;
