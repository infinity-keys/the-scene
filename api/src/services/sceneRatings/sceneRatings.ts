import type {
  QueryResolvers,
  MutationResolvers,
  SceneRatingRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { AuthenticationError } from '@redwoodjs/graphql-server'

export const sceneRatings: QueryResolvers['sceneRatings'] = () => {
  return db.sceneRating.findMany()
}

export const sceneRating: QueryResolvers['sceneRating'] = ({ id }) => {
  return db.sceneRating.findUnique({
    where: { id },
  })
}

export const createSceneRating: MutationResolvers['createSceneRating'] = ({
  input,
}) => {
  return db.sceneRating.create({
    data: input,
  })
}

export const updateSceneRating: MutationResolvers['updateSceneRating'] = ({
  id,
  input,
}) => {
  return db.sceneRating.update({
    data: input,
    where: { id },
  })
}

export const upsertSceneRating: MutationResolvers['upsertSceneRating'] = ({
  sceneId,
  input,
}) => {
  const userId = context.currentUser?.id

  if (!userId) {
    throw new AuthenticationError('Must be logged in to rate scene.')
  }

  const data = { ...input, sceneId, userId }

  return db.sceneRating.upsert({
    where: {
      userId_sceneId: {
        userId,
        sceneId,
      },
    },
    create: data,
    update: data,
  })
}

export const deleteSceneRating: MutationResolvers['deleteSceneRating'] = ({
  id,
}) => {
  return db.sceneRating.delete({
    where: { id },
  })
}

export const SceneRating: SceneRatingRelationResolvers = {
  scene: (_obj, { root }) => {
    return db.sceneRating.findUnique({ where: { id: root?.id } }).scene()
  },
  user: (_obj, { root }) => {
    return db.sceneRating.findUnique({ where: { id: root?.id } }).user()
  },
}
