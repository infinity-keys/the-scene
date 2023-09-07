import type { Prisma, Scene } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.SceneCreateArgs>({
  scene: {
    one: {
      data: {
        updatedAt: "2023-09-06T17:04:49.950Z",
        latitude: 4138074.5641227225,
        longitude: 1417279.3418578045,
        title: "String",
        coverImageId: "String",
      },
    },
    two: {
      data: {
        updatedAt: "2023-09-06T17:04:49.950Z",
        latitude: 2593965.105493412,
        longitude: 6164413.710899495,
        title: "String",
        coverImageId: "String",
      },
    },
  },
});

export type StandardScenario = ScenarioData<Scene, "scene">;
