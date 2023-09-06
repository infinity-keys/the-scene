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

import PaperTitle from "./PaperTitle";

const meta: Meta<typeof PaperTitle> = {
  component: PaperTitle,
};

export default meta;

type Story = StoryObj<typeof PaperTitle>;

export const Primary: Story = {};
