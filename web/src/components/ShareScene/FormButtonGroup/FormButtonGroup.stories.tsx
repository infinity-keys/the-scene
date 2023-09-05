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

import FormButtonGroup from "./FormButtonGroup";

const meta: Meta<typeof FormButtonGroup> = {
  component: FormButtonGroup,
};

export default meta;

type Story = StoryObj<typeof FormButtonGroup>;

export const Primary: Story = {};
