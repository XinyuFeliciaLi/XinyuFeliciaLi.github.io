// Shared bits for the landing-page sandbox directions.

// The "Why Me?" chip and dot colors from the landing page — the sandbox palette
export const WHY_ME = ['#5adba6', '#daf69c', '#fccfe9', '#a3d9ff', '#dac8ff', '#ff894b', '#53bc90'];

// Reduced palettes picked from the sandbox switcher. The first two of each are the Why Me chip
// colors; the rest are deeper shades of the same hues so effects still have contrast.
export const PALETTES: Record<string, string[]> = {
	all: WHY_ME,
	pink: ['#fccfe9', '#dac8ff', '#f49fd2', '#b49af0'],
	bluegreen: ['#a3d9ff', '#5adba6', '#64b6ee', '#53bc90'],
};

export const paletteKey = () => document.documentElement.dataset.sbPalette ?? 'all';
export const currentPalette = () => PALETTES[paletteKey()] ?? WHY_ME;

// The switcher dispatches this on document when the palette changes
export const PALETTE_EVENT = 'sb:palette';

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Runs `init` on every element matching `selector` after each page load (the site uses
// ClientRouter, so scripts run once) and calls the returned cleanup before the next swap.
export function onEachPage(selector: string, init: (el: HTMLElement) => (() => void) | void) {
	let cleanups: (() => void)[] = [];
	document.addEventListener('astro:page-load', () => {
		document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
			const cleanup = init(el);
			if (cleanup) cleanups.push(cleanup);
		});
	});
	document.addEventListener('astro:before-swap', () => {
		cleanups.forEach((fn) => fn());
		cleanups = [];
	});
}

// A requestAnimationFrame loop that only runs while `el` is on screen and the tab is visible
export function visibleLoop(el: Element, frame: (now: number) => void) {
	let raf = 0;
	let onScreen = false;
	const tick = (now: number) => {
		frame(now);
		raf = requestAnimationFrame(tick);
	};
	const sync = () => {
		const run = onScreen && !document.hidden;
		if (run && !raf) raf = requestAnimationFrame(tick);
		if (!run && raf) {
			cancelAnimationFrame(raf);
			raf = 0;
		}
	};
	const io = new IntersectionObserver(([entry]) => {
		onScreen = entry.isIntersecting;
		sync();
	});
	io.observe(el);
	document.addEventListener('visibilitychange', sync);
	return () => {
		io.disconnect();
		document.removeEventListener('visibilitychange', sync);
		cancelAnimationFrame(raf);
	};
}
