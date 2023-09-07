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

import RatingSlider from "./RatingSlider";

const meta: Meta<typeof RatingSlider> = {
  component: RatingSlider,
};

export default meta;

type Story = StoryObj<typeof RatingSlider>;

export const Primary: Story = {};
