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

import InfoInput from "./InfoInput";

const meta: Meta<typeof InfoInput> = {
  component: InfoInput,
};

export default meta;

type Story = StoryObj<typeof InfoInput>;

export const Primary: Story = {};
