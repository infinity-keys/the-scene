import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: { updatedAt: '2023-08-25T18:41:55.203Z', authId: 'String3804649' },
    },
    two: {
      data: { updatedAt: '2023-08-25T18:41:55.203Z', authId: 'String1716905' },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
