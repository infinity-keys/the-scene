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

import CreateScene from "./CreateScene";

const meta: Meta<typeof CreateScene> = {
  component: CreateScene,
};

export default meta;

type Story = StoryObj<typeof CreateScene>;

export const Primary: Story = {};
