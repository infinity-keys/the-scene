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

import type { Meta, StoryObj } from "@storybook/react";

import SceneDetails from "./SceneDetails";

const meta: Meta<typeof SceneDetails> = {
  component: SceneDetails,
};

export default meta;

type Story = StoryObj<typeof SceneDetails>;

export const Primary: Story = {};
