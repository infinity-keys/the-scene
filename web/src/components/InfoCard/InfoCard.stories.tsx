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

import InfoCard from "./InfoCard";

const meta: Meta<typeof InfoCard> = {
  component: InfoCard,
};

export default meta;

type Story = StoryObj<typeof InfoCard>;

export const Primary: Story = {};
