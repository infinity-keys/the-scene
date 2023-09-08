import type { Prisma, User } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: { updatedAt: "2023-09-06T17:06:55.371Z", authId: "String8844783" },
    },
    two: {
      data: { updatedAt: "2023-09-06T17:06:55.371Z", authId: "String2891485" },
    },
  },
});

export type StandardScenario = ScenarioData<User, "user">;
