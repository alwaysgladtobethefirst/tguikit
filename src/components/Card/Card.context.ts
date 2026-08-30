import { createContext } from 'react';

export type CardType = 'plain' | 'ambient';

export const CardContext = createContext<{ type: CardType }>({ type: 'plain' });
