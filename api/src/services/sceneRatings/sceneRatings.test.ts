import type { SceneRating } from "@prisma/client";

import {
  sceneRatings,
  sceneRating,
  createSceneRating,
  updateSceneRating,
  deleteSceneRating,
} from "./sceneRatings";
import type { StandardScenario } from "./sceneRatings.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("sceneRatings", () => {
  scenario("returns all sceneRatings", async (scenario: StandardScenario) => {
    const result = await sceneRatings();

    expect(result.length).toEqual(Object.keys(scenario.sceneRating).length);
  });

  scenario(
    "returns a single sceneRating",
    async (scenario: StandardScenario) => {
      const result = await sceneRating({ id: scenario.sceneRating.one.id });

      expect(result).toEqual(scenario.sceneRating.one);
    }
  );

  scenario("creates a sceneRating", async () => {
    const result = await createSceneRating({
      input: { updatedAt: "2023-09-06T17:04:41.518Z" },
    });

    expect(result.updatedAt).toEqual(new Date("2023-09-06T17:04:41.518Z"));
  });

  scenario("updates a sceneRating", async (scenario: StandardScenario) => {
    const original = (await sceneRating({
      id: scenario.sceneRating.one.id,
    })) as SceneRating;
    const result = await updateSceneRating({
      id: original.id,
      input: { updatedAt: "2023-09-07T17:04:41.518Z" },
    });

    expect(result.updatedAt).toEqual(new Date("2023-09-07T17:04:41.518Z"));
  });

  scenario("deletes a sceneRating", async (scenario: StandardScenario) => {
    const original = (await deleteSceneRating({
      id: scenario.sceneRating.one.id,
    })) as SceneRating;
    const result = await sceneRating({ id: original.id });

    expect(result).toEqual(null);
  });
});
