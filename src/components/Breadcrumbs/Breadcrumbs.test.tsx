import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Breadcrumbs } from './Breadcrumbs';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Chats', href: '/chats' },
  { label: 'Design team', href: '/chats/design' },
];

describe('Breadcrumbs', () => {
  it('renders a nav with the accessible label', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumbs' })).toBeInTheDocument();
  });

  it('renders earlier items as links and the last as current text', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Chats' })).toHaveAttribute('href', '/chats');
    const current = screen.getByText('Design team');
    expect(current).toHaveAttribute('aria-current', 'page');
    expect(current.tagName).not.toBe('A');
  });

  it('renders a button when only onClick is given and fires it', () => {
    const onClick = vi.fn();
    render(<Breadcrumbs items={[{ label: 'Root', onClick }, { label: 'Here' }]} />);
    const button = screen.getByRole('button', { name: 'Root' });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('collapses items beyond maxItems into an ellipsis', () => {
    const many = [
      { label: 'A', href: '/a' },
      { label: 'B', href: '/b' },
      { label: 'C', href: '/c' },
      { label: 'D', href: '/d' },
      { label: 'E', href: '/e' },
    ];
    render(<Breadcrumbs items={many} maxItems={3} />);
    expect(screen.getByText('…')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'A' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'B' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'D' })).toBeInTheDocument();
    expect(screen.getByText('E')).toHaveAttribute('aria-current', 'page');
  });

  it('does not collapse when items.length is within maxItems', () => {
    render(<Breadcrumbs items={items} maxItems={4} />);
    expect(screen.queryByText('…')).not.toBeInTheDocument();
  });
});
