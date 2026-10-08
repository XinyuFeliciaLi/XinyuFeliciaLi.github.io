// Every case study on the site. Card copy is taken word for word from the Figma landing page;
// page content lives in ./cases/<slug>.json (generated from the Figma case study frames).
import type { ImageMetadata } from 'astro';

export type Kind = 'project' | 'playground';

export interface CaseEntry {
	slug: string;
	kind: Kind;
	cardTitle: string;
	cardMeta?: string;
	tags: string[];
	heroAlt: string;
}

export const cases: CaseEntry[] = [
	{
		slug: 'fortune-kid',
		kind: 'project',
		cardTitle: 'Investor-Focused Studio Website',
		cardMeta: 'Fortune Kids Inc. · Shipped · 2026',
		tags: ['Web', 'AI Native Workflow', 'Product Design'],
		heroAlt: 'Fortune Kid studio website shown on a desktop screen',
	},
	{
		slug: 'ai2u-voice-chat',
		kind: 'project',
		cardTitle: 'Designing Trust in AI Chat',
		cardMeta: 'AlterStaff · Shipped · 2025',
		tags: ['AI Product', 'UXUI', 'B2C'],
		heroAlt: 'AI2U chat with voice and text input shown on a desktop screen',
	},
	{
		slug: 'ai2u-design-snapshots',
		kind: 'project',
		cardTitle: 'Shipped AI Product Design',
		cardMeta: 'AlterStaff · Shipped · 2024-2026',
		tags: ['AI Product', 'UXUI', 'B2C'],
		heroAlt: 'AI2U phonograph screen shown on a desktop screen',
	},
	{
		slug: 'childrens-museum',
		kind: 'project',
		cardTitle: 'Interactive Storytelling Tool',
		cardMeta: 'CMP · Shipped · 2023',
		tags: ['UX Research', 'Interaction Design', 'Prototype'],
		heroAlt: "Children's Museum of Pittsburgh storytelling toolkit shown on a desktop screen",
	},
	{
		slug: 'hua',
		kind: 'playground',
		cardTitle: 'Pocket Harmonica Simulator',
		tags: ['Mobile', 'UXUI', 'Vibe Coding'],
		heroAlt: 'HUA: Pocket Harmonica game shown on a phone',
	},
	{
		slug: 'soul-seasoned',
		kind: 'playground',
		cardTitle: 'AI Narrative Diner Game',
		tags: ['AI Game', 'UXUI', 'Unity'],
		heroAlt: 'Soul Seasoned diner game screen shown on a desktop screen',
	},
	{
		slug: 'dreamville-mart',
		kind: 'playground',
		cardTitle: 'Generative AI Multiplayer Game',
		tags: ['AI Game', 'UXUI', 'Unreal'],
		heroAlt: 'Dreamville Mart game screen shown on a desktop screen',
	},
	{
		slug: 'monomon-mr',
		kind: 'playground',
		cardTitle: 'Mixed Reality Combat',
		tags: ['Project Management', 'UXUI'],
		heroAlt: 'Monomon MR mixed reality combat scene',
	},
	{
		slug: 'graphic-ui-snapshots',
		kind: 'playground',
		cardTitle: 'Graphic & UI Snapshots',
		tags: ['Visual Design'],
		heroAlt: 'Three blue parrot character illustrations',
	},
];

export interface Block {
	t: string;
	runs?: { s: string; b?: 1; i?: 1; href?: string }[];
	muted?: 1;
	tint?: 1;
	center?: 1;
	right?: 1;
	blue?: 1;
	color?: string;
	band?: 1;
	fill?: string;
	list?: 'ul' | 'ol';
	lines?: { s: string; b?: 1; i?: 1; href?: string }[][];
	src?: string;
	w?: number;
	h?: number;
	alt?: string;
	video?: string;
	items?: Block[];
	cols?: { w: number; items: Block[] }[];
}

export interface CaseContent {
	title: string;
	sections: { id: string; name: string; items: Block[] }[];
}

const content = import.meta.glob<CaseContent>('./cases/*.json', { eager: true, import: 'default' });
const heroes = import.meta.glob<ImageMetadata>('../assets/heroes/*.png', { eager: true, import: 'default' });
const cards = import.meta.glob<ImageMetadata>('../assets/home/card-*.png', { eager: true, import: 'default' });
const images = import.meta.glob<ImageMetadata>('../assets/cases/*/*.png', { eager: true, import: 'default' });
const videos = import.meta.glob<string>('../assets/media/*/*.mp4', { eager: true, query: '?url', import: 'default' });

export const caseContent = (slug: string) => content[`./cases/${slug}.json`];
export const heroImage = (slug: string) => heroes[`../assets/heroes/${slug}.png`];
export const cardImage = (slug: string) => cards[`../assets/home/card-${slug}.png`];
export const blockImage = (src: string) => images[`../assets/cases/${src}`];
export const videoUrl = (key: string) => videos[`../assets/media/${key}`];

export const caseHref = (c: CaseEntry) => `/${c.kind === 'project' ? 'projects' : 'playground'}/${c.slug}/`;
export const hasPage = (slug: string) => Boolean(caseContent(slug));
