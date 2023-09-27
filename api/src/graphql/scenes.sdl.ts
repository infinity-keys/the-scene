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
    currentUserRating: [SceneRating]
  }

  type SceneAverages {
    vibe: Int
    crowded: Int
    live: Boolean
    totalRatings: Int
  }

  input BoundsInput {
    north: Float!
    south: Float!
    east: Float!
    west: Float!
  }

  type Query {
    scenes(bounds: BoundsInput!): [Scene!]! @skipAuth
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

  input CreateSeedSceneInput {
    latitude: Float!
    longitude: Float!
    title: String!
    coverImageId: String!
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
