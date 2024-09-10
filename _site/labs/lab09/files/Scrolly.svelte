<script>
	import { onMount } from "svelte";

	export let progress = 0;
	export let progressUnclamped = 0;
	export let threshold = 0.5;
	export let margin = 20;
	export let debounce = false;

	let container, vizContainer;
	let minTop, maxTop;
	let pageTop;
	let rect = {};
	let intersectionObserver, resizeObserver;
	let intersectionRatio = 0;

	const clamp = (min, value, max) => Math.min(Math.max(min, value), max);
	const getProgress = (value, min, max) => 100 * (value - min) / (max - min);

	onMount(() => {
		function updateProgress ({top = container.getBoundingClientRect().top} = {}) {
			progressUnclamped = getProgress(top, minTop, maxTop);
			progress = clamp(0, progressUnclamped, 100);
			// console.table({minTop, maxTop, pageTop, top, progress, progressUnclamped});
		}

		function calculateBounds () {
			rect = container.getBoundingClientRect();

			// progress = 0 when the top of the container passes threshold% of the viewport
			// OR when we’re scrolled all the way to the top,
			// whichever is greater
			pageTop = window.scrollY + rect.top; // this is always constant
			minTop = Math.min(pageTop, innerHeight * threshold) + margin;

			// progress = 100 when the bottom of the container is at the bottom of the viewport (minus the margin),
			// except when this is not possible
			maxTop = innerHeight - rect.height - margin;

			updateProgress(rect);
		}

		intersectionObserver = new IntersectionObserver(entries => {
			let lastEntry = entries.at(-1);
			intersectionRatio = lastEntry.intersectionRatio;

			if (lastEntry.isIntersecting) {
				calculateBounds();
				updateProgress();
				window.addEventListener('scroll', updateProgress);
				window.addEventListener('resize', calculateBounds);
				resizeObserver?.observe(container);
			}
			else {
				window.removeEventListener('scroll', updateProgress);
				window.removeEventListener('resize', calculateBounds);
				resizeObserver?.unobserve(container);
			}
		});

		intersectionObserver.observe(container, {
			rootMargin: (margin ?? 0) + "px",
			threshold: threshold
		});

		resizeObserver = new ResizeObserver(calculateBounds);

		calculateBounds();
	});
	</script>

	<section class="scrolly" bind:this={container}>
		<section class="story">
			<slot />
		</section>
		<section class="viz" bind:this={vizContainer}>
			<slot name="viz" />
		</section>
	</section>

	<style>
	.scrolly {
		position: relative;
		display: grid;
		grid-template-columns: var(--scrolly-story-width, 1fr) var(--scrolly-viz-width, 1fr);
		grid-auto-flow: row dense;
		gap: var(--scrolly-gap, 4rem);
	}

	.viz,
	.story {
		grid-row: 1;
	}

	.viz {
		position: sticky;
		top: var(--viz-margin-top, 1em);
		max-height: 100vh;
	}

	@container style(--layout: viz story) {
		.scrolly {
			grid-template-columns: var(--scrolly-viz-width, 1fr) var(--scrolly-story-width, 1fr);
		}

		.viz {
			grid-column: 1;
		}

		.story {
			grid-column: 2;
		}
	}
	</style>

