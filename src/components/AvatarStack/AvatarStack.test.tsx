import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Avatar } from '../Avatar';
import { AvatarStack } from './AvatarStack';

describe('AvatarStack', () => {
  it('renders its avatars', () => {
    render(
      <AvatarStack data-testid="s">
        <Avatar acronym="AB" />
        <Avatar acronym="CD" />
        <Avatar acronym="+3" />
      </AvatarStack>,
    );
    expect(screen.getByTestId('s').children).toHaveLength(3);
    expect(screen.getByText('AB')).toBeInTheDocument();
    expect(screen.getByText('+3')).toBeInTheDocument();
  });

  it('sets the overlap custom property', () => {
    render(
      <AvatarStack data-testid="s" overlap={16}>
        <Avatar acronym="AB" />
      </AvatarStack>,
    );
    expect(screen.getByTestId('s').style.getPropertyValue('--tgui--avatar-stack--overlap')).toBe(
      '16px',
    );
  });

  it('forwards ref and className', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<AvatarStack ref={ref} className="mine" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass('mine');
  });
});
