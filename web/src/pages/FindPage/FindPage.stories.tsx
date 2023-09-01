import type { Meta, StoryObj } from "@storybook/react";

import FindPage from "./FindPage";

const meta: Meta<typeof FindPage> = {
  component: FindPage,
};

export default meta;

type Story = StoryObj<typeof FindPage>;

export const Primary: Story = {};
