import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const userByAuth: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { authId: id },
  })
}

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const upsertUser: MutationResolvers['upsertUser'] = ({
  authId,
  input,
}) => {
  return db.user.upsert({
    where: { authId },
    create: input.create,
    update: input.update,
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User: UserRelationResolvers = {
  ratings: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).ratings()
  },
  scenes: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).scenes()
  },
}
