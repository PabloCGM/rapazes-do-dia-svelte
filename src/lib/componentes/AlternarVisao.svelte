<script lang="ts">
	import { resolve } from '$app/paths';

	let { atual }: { atual: 'lista' | 'quadro' } = $props();
</script>

<!-- Links comuns: a busca e os filtros vivem em filtros.svelte.ts e continuam aplicados na outra visão. -->
<nav class="alternar" aria-label="Visão das tarefas">
	<a href={resolve('/')} aria-current={atual === 'lista' ? 'page' : undefined}>Lista</a>
	<a href={resolve('/quadro')} aria-current={atual === 'quadro' ? 'page' : undefined}>Quadro</a>
</nav>

<style>
	.alternar { display: inline-flex; padding: .2rem; border: 1px solid #cbd5e1; border-radius: .6rem; background: #fff; }
	a { padding: .45rem .9rem; border-radius: .45rem; color: #334155; font-weight: 650; text-decoration: none; }
	a:hover { background: #f1f5f9; }
	a[aria-current='page'] { background: #0f172a; color: #fff; }
</style>
