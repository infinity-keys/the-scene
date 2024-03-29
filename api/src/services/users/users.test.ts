import type { User } from "@prisma/client";

import { users, user, createUser, updateUser, deleteUser } from "./users";
import type { StandardScenario } from "./users.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("users", () => {
  scenario("returns all users", async (scenario: StandardScenario) => {
    const result = await users();

    expect(result.length).toEqual(Object.keys(scenario.user).length);
  });

  scenario("returns a single user", async (scenario: StandardScenario) => {
    const result = await user({ id: scenario.user.one.id });

    expect(result).toEqual(scenario.user.one);
  });

  scenario("creates a user", async () => {
    const result = await createUser({
      input: { updatedAt: "2023-09-06T17:06:55.354Z", authId: "String3731834" },
    });

    expect(result.updatedAt).toEqual(new Date("2023-09-06T17:06:55.354Z"));
    expect(result.authId).toEqual("String3731834");
  });

  scenario("updates a user", async (scenario: StandardScenario) => {
    const original = (await user({ id: scenario.user.one.id })) as User;
    const result = await updateUser({
      id: original.id,
      input: { updatedAt: "2023-09-07T17:06:55.354Z" },
    });

    expect(result.updatedAt).toEqual(new Date("2023-09-07T17:06:55.354Z"));
  });

  scenario("deletes a user", async (scenario: StandardScenario) => {
    const original = (await deleteUser({ id: scenario.user.one.id })) as User;
    const result = await user({ id: original.id });

    expect(result).toEqual(null);
  });
});
