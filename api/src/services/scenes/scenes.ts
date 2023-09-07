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

export const scenes: QueryResolvers['scenes'] = () => {
  return db.scene.findMany()
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
}
