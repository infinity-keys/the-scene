export const schema = gql`
  type SceneRating {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    live: Boolean!
    vibe: Int!
    crowded: Int!
    scene: Scene
    sceneId: String
    user: User
    userId: String
  }

  type Query {
    sceneRatings: [SceneRating!]! @requireAuth
    sceneRating(id: String!): SceneRating @requireAuth
  }

  input CreateSceneRatingInput {
    live: Boolean!
    vibe: Int!
    crowded: Int!
    sceneId: String
    userId: String
  }

  input UpdateSceneRatingInput {
    live: Boolean
    vibe: Int
    crowded: Int
    sceneId: String
    userId: String
  }

  type Mutation {
    createSceneRating(input: CreateSceneRatingInput!): SceneRating! @requireAuth
    updateSceneRating(
      id: String!
      input: UpdateSceneRatingInput!
    ): SceneRating! @requireAuth
    deleteSceneRating(id: String!): SceneRating! @requireAuth
  }
`;
