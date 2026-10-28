<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	const emTarefas = $derived(page.url.pathname === '/' || page.url.pathname.startsWith('/tarefas'));
	const emQuadro = $derived(page.url.pathname.startsWith('/quadro'));
	const emProjetos = $derived(page.url.pathname.startsWith('/projetos'));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<a class="marca" href={resolve('/')}>Rapazes do Dia</a>
	<nav aria-label="Principal">
		<a href={resolve('/')} aria-current={emTarefas ? 'page' : undefined}>Tarefas</a>
		<a href={resolve('/quadro')} aria-current={emQuadro ? 'page' : undefined}>Quadro</a>
		<a href={resolve('/projetos')} aria-current={emProjetos ? 'page' : undefined}>Projetos</a>
	</nav>
</header>

<main>
	{@render children()}
</main>

<style>
	:global(body) {
		margin: 0;
		font-family: system-ui, sans-serif;
		background: #fafafa;
		color: #18181b;
	}
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		background: #18181b;
	}
	header a {
		color: #fafafa;
		text-decoration: none;
	}
	.marca {
		font-weight: 700;
	}
	nav {
		display: flex;
		gap: 1rem;
	}
	nav a[aria-current='page'] {
		text-decoration: underline;
		text-underline-offset: 0.3rem;
	}
	main {
		max-width: 60rem;
		margin: 2rem auto;
		padding: 0 1rem;
	}
</style>
