import type {
  QueryResolvers,
  MutationResolvers,
  SceneRatingRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

export const sceneRatings: QueryResolvers["sceneRatings"] = () => {
  return db.sceneRating.findMany();
};

export const sceneRating: QueryResolvers["sceneRating"] = ({ id }) => {
  return db.sceneRating.findUnique({
    where: { id },
  });
};

export const createSceneRating: MutationResolvers["createSceneRating"] = ({
  input,
}) => {
  return db.sceneRating.create({
    data: input,
  });
};

export const updateSceneRating: MutationResolvers["updateSceneRating"] = ({
  id,
  input,
}) => {
  return db.sceneRating.update({
    data: input,
    where: { id },
  });
};

export const deleteSceneRating: MutationResolvers["deleteSceneRating"] = ({
  id,
}) => {
  return db.sceneRating.delete({
    where: { id },
  });
};

export const SceneRating: SceneRatingRelationResolvers = {
  scene: (_obj, { root }) => {
    return db.sceneRating.findUnique({ where: { id: root?.id } }).scene();
  },
  user: (_obj, { root }) => {
    return db.sceneRating.findUnique({ where: { id: root?.id } }).user();
  },
};
