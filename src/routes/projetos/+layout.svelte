<script lang="ts">
	import { navigating } from '$app/state';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<main class="projetos" aria-busy={navigating.to !== null}>
	{#if navigating.to}
		<p role="status">Carregando projetos…</p>
	{/if}
	{@render children()}
</main>

<style>
	.projetos {
		max-width: 64rem;
		margin: 3rem auto;
		padding: 0 1rem;
		font-family: system-ui, sans-serif;
		color: #1f2937;
	}
	.projetos :global(h1) {
		margin: 1rem 0;
		overflow-wrap: anywhere;
	}
	.projetos :global(a) {
		color: #1d4ed8;
		text-underline-offset: 0.2em;
	}
	.projetos :global(a:focus-visible), .projetos :global(button:focus-visible) {
		outline: 3px solid #1d4ed8;
		outline-offset: 4px;
	}
	.projetos :global(.grade) {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 19rem), 1fr));
		gap: 1rem;
		padding: 0;
		list-style: none;
	}
	.projetos :global(.mensagem) {
		padding: 1.25rem;
		border: 1px solid #d1d5db;
		border-radius: 0.75rem;
		background: #f9fafb;
		line-height: 1.6;
	}
	.projetos :global(.erro) {
		border-color: #fecaca;
		background: #fef2f2;
		color: #991b1b;
	}
	.projetos :global(button) {
		padding: 0.6rem 1rem;
		border: 1px solid currentColor;
		border-radius: 0.375rem;
		background: white;
		color: #1d4ed8;
		font: inherit;
		cursor: pointer;
	}
</style>
