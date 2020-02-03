const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type User {
    _id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    title: String!
    companyName: String!
    companyAddress: String!
    telephone: Int!
    userRole: String!
    createdAt: String!
    updatedAt: String!
  }

type AuthData {
    _id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    title: String!
    companyName: String!
    companyAddress: String!
    telephone: Int!
    userRole: String!
    createdAt: String!
    updatedAt: String!
    token: String!
    tokenExpiration: Int!
  }

type Item {
    _id: ID!
    name: String!
    description: String!
    price: Float!
    image: String!
    createdAt: String!
    updatedAt: String!
}

input UserInput {
    firstName: String!
    lastName: String!
    userName: String!
    password: String!
    title: String!
    companyName: String!
    companyAddress: String!
    telephone: Float!
    userRole: String
}

input ItemInput {
    name: String!
    description: String!
    price: Float!
    image: String!
}

type RootQuery {
    items: [Item!]
    users: [User!]
    login(userName: String!, password: String!): AuthData!
}

type RootMutation {
    signup(userInput: UserInput!): User
    createItem(itemInput: ItemInput!): Item
}

schema {
    query: RootQuery
    mutation: RootMutation
}

`)