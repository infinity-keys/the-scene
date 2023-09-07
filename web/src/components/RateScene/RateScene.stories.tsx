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

import RateScene from "./RateScene";

const meta: Meta<typeof RateScene> = {
  component: RateScene,
};

export default meta;

type Story = StoryObj<typeof RateScene>;

export const Primary: Story = {};
