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

import CameraCapture from "./CameraCapture";

const meta: Meta<typeof CameraCapture> = {
  component: CameraCapture,
};

export default meta;

type Story = StoryObj<typeof CameraCapture>;

export const Primary: Story = {};
