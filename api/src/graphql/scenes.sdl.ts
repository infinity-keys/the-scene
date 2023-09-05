export const schema = gql`
  type Scene {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    latitude: Float!
    longitude: Float!
    title: String!
    info: String
    link: String
    coverImageId: String!
  }

  type Query {
    scenes: [Scene!]! @requireAuth
    scene(id: String!): Scene @requireAuth
  }

  input CreateSceneInput {
    latitude: Float!
    longitude: Float!
    title: String!
    info: String
    link: String
    imageData: String!
  }

  input UpdateSceneInput {
    latitude: Float
    longitude: Float
    title: String
    info: String
    link: String
    imageData: String
  }

  type Mutation {
    createScene(input: CreateSceneInput!): Scene! @requireAuth
    updateScene(id: String!, input: UpdateSceneInput!): Scene! @requireAuth
    deleteScene(id: String!): Scene! @requireAuth
  }
`
