import type { Scene } from "@prisma/client";

import { scenes, scene, createScene, updateScene, deleteScene } from "./scenes";
import type { StandardScenario } from "./scenes.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("scenes", () => {
  scenario("returns all scenes", async (scenario: StandardScenario) => {
    const result = await scenes();

    expect(result.length).toEqual(Object.keys(scenario.scene).length);
  });

  scenario("returns a single scene", async (scenario: StandardScenario) => {
    const result = await scene({ id: scenario.scene.one.id });

    expect(result).toEqual(scenario.scene.one);
  });

  scenario("creates a scene", async () => {
    const result = await createScene({
      input: {
        updatedAt: "2023-09-07T17:13:37.618Z",
        latitude: 6948079.794127557,
        longitude: 7304047.425403943,
        title: "String",
        coverImageId: "String",
      },
    });

    expect(result.updatedAt).toEqual(new Date("2023-09-07T17:13:37.618Z"));
    expect(result.latitude).toEqual(6948079.794127557);
    expect(result.longitude).toEqual(7304047.425403943);
    expect(result.title).toEqual("String");
    expect(result.coverImageId).toEqual("String");
  });

  scenario("updates a scene", async (scenario: StandardScenario) => {
    const original = (await scene({ id: scenario.scene.one.id })) as Scene;
    const result = await updateScene({
      id: original.id,
      input: { updatedAt: "2023-09-08T17:13:37.618Z" },
    });

    expect(result.updatedAt).toEqual(new Date("2023-09-08T17:13:37.618Z"));
  });

  scenario("deletes a scene", async (scenario: StandardScenario) => {
    const original = (await deleteScene({
      id: scenario.scene.one.id,
    })) as Scene;
    const result = await scene({ id: original.id });

    expect(result).toEqual(null);
  });
});
