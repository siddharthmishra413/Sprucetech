const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type User {
    userId: ID!
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
    userId: ID!
    firstName: String!
    lastName: String!
    userName: String!
    title: String!
    companyName: String!
    companyAddress: String!
    telephone: Int!
    userRole: String!
    token: String!
    tokenExpiration: Int!
    createdAt: String!
    updatedAt: String!
  }

type Item {
    itemId: ID!
    name: String!
    despriction: String!
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
    telephone: Int!
    userRole: String!
}

input ItemInput {
    name: String!
    despriction: String!
    price: Float!
    image: String!
}

type RootQuery {
    items: [Item!]
    users: [User!]
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    signup(userInput: UserInput!): User
    createItem(item: ItemInput!): Item
}

schema {
    query: RootQuery
    mutation: RootMutation
}

`)