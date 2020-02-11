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
    telephone: Float!
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

type NotificationData {
    message: String!
    link: String!
}

type VerificationData {
    userName: String!
    userId: ID!
}

type PasswordResetData{
    message: String!
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
    forgotPassword(userName: String!): NotificationData!
}

type RootMutation {
    login(userName: String!, password: String!): AuthData!
    signup(userInput: UserInput!): User
    createItem(itemInput: ItemInput!): Item
    tokenVerification(refreshTokenForPassword: String!): VerificationData!
    passwordReset(refreshToken: String!, userId: ID!, newPassword: String!): PasswordResetData!
}

schema {
    query: RootQuery
    mutation: RootMutation
}

`)