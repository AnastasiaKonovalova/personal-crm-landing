// Loads page texts from src/content/landing.md and fails the build with a clear
// message if a field is missing, so a broken edit never ships silently.
import { frontmatter } from '../content/landing.md';

interface Item {
  title: string;
  text: string;
}

export interface Texts {
  meta_title: string;
  meta_description: string;
  brand: string;
  tagline: string;
  button: string;
  hero_title: string;
  hero_subtitle: string;
  problem_label: string;
  problem_title: string;
  problem_items: string[];
  problem_closing: string;
  solution_label: string;
  solution_title: string;
  solution_text: string;
  solution_steps: Item[];
  benefits_label: string;
  benefits_title: string;
  benefits: Item[];
  cta_title: string;
  cta_subtitle: string;
}

const required: (keyof Texts)[] = [
  'meta_title', 'meta_description', 'brand', 'tagline', 'button',
  'hero_title', 'hero_subtitle',
  'problem_label', 'problem_title', 'problem_items', 'problem_closing',
  'solution_label', 'solution_title', 'solution_text', 'solution_steps',
  'benefits_label', 'benefits_title', 'benefits',
  'cta_title', 'cta_subtitle',
];

const missing = required.filter((key) => {
  const value = frontmatter[key];
  return value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0);
});
if (missing.length > 0) {
  throw new Error(`src/content/landing.md: missing or empty fields: ${missing.join(', ')}`);
}

export const texts = frontmatter as Texts;

if (texts.solution_steps.length !== 3) {
  throw new Error('src/content/landing.md: solution_steps must have exactly 3 steps (one per mockup)');
}

// "~" in texts means a non-breaking space (keeps words on one line).
export const nbsp = (s: string) => s.replaceAll('~', ' ');
