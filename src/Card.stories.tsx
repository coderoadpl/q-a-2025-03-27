import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Memory Game/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const NotFlipped: Story = {
  args: {
    id: '1',
    value: '🥝',
    isFlipped: false,
    isMatched: false,
  },
};

export const Flipped: Story = {
  args: {
    id: '2',
    value: '🍌',
    isFlipped: true,
    isMatched: false,
  },
};

export const Matched: Story = {
  args: {
    id: '3',
    value: '🍇',
    isFlipped: true,
    isMatched: true,
  },
};
