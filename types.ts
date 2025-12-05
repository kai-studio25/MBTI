export type Dimension = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export interface Question {
  id: number;
  text: string;
  category: 'EI' | 'SN' | 'TF' | 'JP';
  options: {
    A: { text: string; type: Dimension };
    B: { text: string; type: Dimension };
  };
}

export interface MBTIResult {
  type: string;
  title: string; // Fun archetype name
  subTitle: string; // Witty one-liner
  description: string;
  cardSummary: string; // Short summary for the ID card (< 200 chars)
  traits: string[]; // Hashtags
  strengths: string[];
  weaknesses: string[];
  bestMatch: {
    type: string;
    reason: string;
  };
  worstMatch: {
    type: string;
    reason: string;
  };
  advice: string;
  emoji: string; // Representative emoji
  color: string; // Hex color for the card
}

export interface TypeInfo {
  code: string;
  title: string;
  summary: string;
  tags: string[];
  emoji: string;
  color: string;
}

export type ScreenState = 'INTRO' | 'TEST' | 'LOADING' | 'RESULT' | 'LIBRARY';