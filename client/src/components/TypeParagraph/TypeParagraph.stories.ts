import type { Meta, StoryObj } from '@storybook/react';
import TypeParagraph from "./TypeParagraph"

const meta = {
    title: 'TypeParagraph',
    component: TypeParagraph,
    argTypes: {
        text: {
            control: 'text',
        }
    },
} satisfies Meta<typeof TypeParagraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        text: "Hello"
    },
};