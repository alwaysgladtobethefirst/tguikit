'use client';

import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useTgui } from '../TguiProvider';

export interface PortalProps {
  children?: ReactNode;
  container?: Element | DocumentFragment | null;
}

export function Portal({ children, container }: PortalProps) {
  const { portalContainer } = useTgui();
  const target = container ?? portalContainer;
  if (!target) return null;
  return createPortal(children, target);
}

Portal.displayName = 'Portal';
