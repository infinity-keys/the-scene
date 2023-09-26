// Pass props to your component by passing an `args` object to your story
//
// ```jsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import InfoCard from './InfoCard'

const meta: Meta<typeof InfoCard> = {
  component: InfoCard,
  args: {
    scene: {
      id: 'test',
      createdAt: new Date().toDateString(),
      latitude: 40.712776,
      longitude: -74.005974,
      title: 'City Groove',
      coverImageId: 'the-scene/ezmo6zfqocjzabg6f82u',
      info: 'Urban beats in the heart of NYC.',
      link: 'https://bandcamp.com',
      user: {
        username: '__shax__',
        avatar:
          'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZGlzY29yZC9pbWdfMlY3bDk5YkhCTWhlbXBrdkgzTWZleGJDR1YwLnBuZyJ9',
      },
      averages: {
        live: true,
        crowded: true,
        vibe: true,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof InfoCard>

export const Primary: Story = {}
