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

import LiveTag from "./LiveTag";

const meta: Meta<typeof LiveTag> = {
  component: LiveTag,
};

export default meta;

type Story = StoryObj<typeof LiveTag>;

export const Primary: Story = {};
