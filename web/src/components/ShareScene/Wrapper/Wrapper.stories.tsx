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

import Wrapper from "./Wrapper";

const meta: Meta<typeof Wrapper> = {
  component: Wrapper,
};

export default meta;

type Story = StoryObj<typeof Wrapper>;

export const Primary: Story = {};
