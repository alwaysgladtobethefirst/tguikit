import type { ReactNode } from 'react';
import { DISPLAY } from './tokens';

interface ArticleProps {
  title: string;
  lead: ReactNode;
  children: ReactNode;
}

// shared doc-page shell: centred column, heading + intro, then the examples
export function Article({ title, lead, children }: ArticleProps) {
  return (
    <div
      style={{
        maxWidth: 620,
        margin: '0 auto',
        color: 'var(--tgui--text_color)',
        fontFamily: DISPLAY,
        display: 'grid',
        gap: 40,
      }}
    >
      <header style={{ display: 'grid', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 30, fontWeight: 640, letterSpacing: '-0.025em' }}>
          {title}
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 16,
            lineHeight: 1.6,
            color: 'var(--tgui--subtitle_text_color)',
          }}
        >
          {lead}
        </p>
      </header>
      {children}
    </div>
  );
}
