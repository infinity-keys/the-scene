import type { Prisma, SceneRating } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.SceneRatingCreateArgs>({
  sceneRating: {
    one: { data: { updatedAt: "2023-09-06T17:04:41.532Z" } },
    two: { data: { updatedAt: "2023-09-06T17:04:41.532Z" } },
  },
});

export type StandardScenario = ScenarioData<SceneRating, "sceneRating">;
