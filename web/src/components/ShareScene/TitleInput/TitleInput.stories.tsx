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

import TitleInput from "./TitleInput";

const meta: Meta<typeof TitleInput> = {
  component: TitleInput,
};

export default meta;

type Story = StoryObj<typeof TitleInput>;

export const Primary: Story = {};
