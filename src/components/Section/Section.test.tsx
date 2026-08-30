import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { TguiPlatform } from '../../shared/types/tgui';
import { TguiProvider } from '../TguiProvider';
import { Section } from './Section';

function renderSection(ui: ReactNode, platform: TguiPlatform = 'base') {
  const result = render(<TguiProvider platform={platform}>{ui}</TguiProvider>);
  return { ...result, section: result.container.querySelector('section') as HTMLElement };
}

beforeEach(() => {
  window.matchMedia ??= vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as unknown as typeof window.matchMedia;
});

describe('Section', () => {
  it('renders a section wrapping its children', () => {
    renderSection(
      <Section>
        <div>Row one</div>
        <div>Row two</div>
      </Section>,
    );
    expect(screen.getByText('Row one')).toBeInTheDocument();
    expect(screen.getByText('Row two')).toBeInTheDocument();
  });

  it('inserts a divider between rows but not around them', () => {
    const { section } = renderSection(
      <Section>
        <div>a</div>
        <div>b</div>
        <div>c</div>
      </Section>,
    );
    expect(section.querySelectorAll('hr')).toHaveLength(2);
  });

  it('auto-wraps a string header and footer', () => {
    const { container } = renderSection(<Section header="Account" footer="Shown to contacts" />);
    expect(container.querySelector('header')).toHaveTextContent('Account');
    const footer = container.querySelector('footer');
    expect(footer).toHaveTextContent('Shown to contacts');
    expect(footer?.querySelector('[class*="footerText"]')).toBeInTheDocument();
  });

  it('uses a Section.Header element as-is', () => {
    const { container } = renderSection(
      <Section header={<Section.Header large>Settings</Section.Header>}>
        <div>x</div>
      </Section>,
    );
    const header = container.querySelector('header');
    expect(header).toHaveTextContent('Settings');
    expect(header?.className).toContain('headerLarge');
  });

  it('picks the platform surface style', () => {
    const { section: base } = renderSection(<Section>{<div>x</div>}</Section>, 'base');
    expect(base.className).toContain('sectionBase');

    const { section: ios } = renderSection(<Section>{<div>x</div>}</Section>, 'ios');
    expect(ios.className).toContain('sectionIos');
  });

  it('exposes Header and Footer as statics', () => {
    expect(Section.Header).toBeTypeOf('function');
    expect(Section.Footer).toBeTypeOf('function');
  });

  it('forwards ref and className', () => {
    const ref = { current: null as HTMLElement | null };
    renderSection(
      <Section ref={ref} className="group">
        <div>x</div>
      </Section>,
    );
    expect(ref.current?.tagName).toBe('SECTION');
    expect(ref.current).toHaveClass('group');
  });
});
