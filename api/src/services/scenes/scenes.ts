import type { QueryResolvers, MutationResolvers } from 'types/graphql'
import { v2 as cloudinary } from 'cloudinary'
import { db } from 'src/lib/db'
import { AuthenticationError } from '@redwoodjs/graphql-server'

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
})

const options = {
  use_filename: false,
  unique_filename: true,
  overwrite: true,
}

export const scenes: QueryResolvers['scenes'] = ({
  bounds: { north, south, east, west },
}) => {
  return db.scene.findMany({
    where: {
      latitude: {
        gte: south,
        lte: north,
      },
      longitude: {
        gte: west,
        lte: east,
      },
    },
  })
}

export const scene: QueryResolvers['scene'] = ({ id }) => {
  return db.scene.findUnique({
    where: { id },
  })
}

export const createScene: MutationResolvers['createScene'] = async ({
  input,
}) => {
  const { imageData, ...rest } = input
  const authId = context.currentUser?.id

  if (!authId) {
    throw new AuthenticationError('Must be logged in to share scene.')
  }

  const result = await cloudinary.uploader.upload(imageData, {
    ...options,
    folder: 'the-scene',
  })

  return db.scene.create({
    data: {
      ...rest,
      coverImageId: result.public_id,
      userId: authId,
    },
  })
}

export const updateScene: MutationResolvers['updateScene'] = ({
  id,
  input,
}) => {
  return db.scene.update({
    data: input,
    where: { id },
  })
}

export const deleteScene: MutationResolvers['deleteScene'] = ({ id }) => {
  return db.scene.delete({
    where: { id },
  })
}

export const Scene: SceneRelationResolvers = {
  ratings: (_obj, { root }) => {
    return db.scene.findUnique({ where: { id: root?.id } }).ratings()
  },
  user: (_obj, { root }) => {
    return db.scene.findUnique({ where: { id: root?.id } }).user()
  },
  averages: async (_obj, { root }) => {
    const {
      _avg: { vibe, crowded },
      _count,
    } = await db.sceneRating.aggregate({
      where: {
        sceneId: root?.id,
      },
      _avg: {
        vibe: true,
        crowded: true,
      },
      _count: {
        _all: true,
      },
    })

    const liveCount = await db.sceneRating.count({
      where: {
        sceneId: root?.id,
        live: { equals: true },
      },
    })

    return {
      vibe: typeof vibe === 'number' ? vibe >= 2.5 : null,
      crowded: typeof crowded === 'number' ? crowded >= 2.5 : null,
      // if there are no ratings, set show to live and handle the time checks in the front end
      live: _count._all === 0 ? true : liveCount / _count._all >= 0.5,
      totalRatings: _count._all,
    }
  },
}
