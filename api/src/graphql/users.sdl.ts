export const schema = gql`
  type User {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    authId: String!
    username: String
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    authId: String!
    username: String
  }

  input UpdateUserInput {
    authId: String
    username: String
  }

  input UpsertUserInput {
    create: CreateUserInput
    update: UpdateUserInput
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    upsertUser(authId: String!, input: UpsertUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`
