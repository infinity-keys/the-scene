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
    user: User
    userId: String
    averages: SceneAverages
  }

  type SceneAverages {
    vibe: Boolean
    crowded: Boolean
    live: Boolean
    totalRatings: Int
  }

  type Query {
    scenes: [Scene!]! @skipAuth
    scene(id: String!): Scene @skipAuth
  }

  input CreateSceneInput {
    latitude: Float!
    longitude: Float!
    title: String!
    imageData: String!
    info: String
    link: String
    userId: String
  }

  input UpdateSceneInput {
    latitude: Float
    longitude: Float
    title: String
    imageData: String!
    info: String
    link: String
    userId: String
  }

  type Mutation {
    createScene(input: CreateSceneInput!): Scene! @requireAuth
    updateScene(id: String!, input: UpdateSceneInput!): Scene! @requireAuth
    deleteScene(id: String!): Scene! @requireAuth
  }
`
