export const schema = gql`
  type User {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    authId: String!
    username: String
    avatar: String
    ratings: [SceneRating]!
    scenes: [Scene]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    authId: String!
    username: String
    avatar: String
  }

  input UpdateUserInput {
    authId: String
    username: String
    avatar: String
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
