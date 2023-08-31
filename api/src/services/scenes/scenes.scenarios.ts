import type { Prisma, Scene } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.SceneCreateArgs>({
  scene: {
    one: {
      data: {
        updatedAt: "2023-08-30T19:44:29.854Z",
        latitude: 744856.6347940111,
        longitude: 4611963.044656999,
        title: "String",
        coverImageId: "String",
      },
    },
    two: {
      data: {
        updatedAt: "2023-08-30T19:44:29.854Z",
        latitude: 9384384.264989456,
        longitude: 4224101.017294419,
        title: "String",
        coverImageId: "String",
      },
    },
  },
});

export type StandardScenario = ScenarioData<Scene, "scene">;
