export const schema = gql`
  type Scene {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    latitude: Float!
    longitude: Float!
    title: String!
    coverImageId: String!
    info: String
    link: String
    ratings: [SceneRating]!
  }

  type Query {
    scenes: [Scene!]! @requireAuth
    scene(id: String!): Scene @requireAuth
  }

  input CreateSceneInput {
    latitude: Float!
    longitude: Float!
    title: String!
    coverImageId: String!
    info: String
    link: String
  }

  input UpdateSceneInput {
    latitude: Float
    longitude: Float
    title: String
    coverImageId: String
    info: String
    link: String
  }

  type Mutation {
    createScene(input: CreateSceneInput!): Scene! @requireAuth
    updateScene(id: String!, input: UpdateSceneInput!): Scene! @requireAuth
    deleteScene(id: String!): Scene! @requireAuth
  }
`
