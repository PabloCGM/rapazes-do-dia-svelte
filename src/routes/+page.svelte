<script lang="ts">
	import { onMount } from 'svelte';
	import { API, listarProjetos, listarTarefas } from '#lib/api.ts';

	let projetos = $state(0);
	let tarefas = $state(0);
	let erro = $state('');
	let carregando = $state(true);

	onMount(async () => {
		try {
			const [p, t] = await Promise.all([listarProjetos(), listarTarefas()]);
			projetos = p.length;
			tarefas = t.length;
		} catch (e) {
			erro = e instanceof Error ? e.message : String(e);
		} finally {
			carregando = false;
		}
	});
</script>

<svelte:head>
	<title>Rapazes do Dia</title>
</svelte:head>

<main>
	<h1>Rapazes do Dia</h1>
	<p>Projeto da disciplina de Desenvolvimento Frontend, feito em Svelte com TypeScript.</p>

	{#if carregando}
		<p>Conectando à API em {API}…</p>
	{:else if erro}
		<p class="erro">
			API fora do ar ({erro}). Rode <code>npx json-server db.json</code> em outro terminal.
		</p>
	{:else}
		<p class="ok">API no ar: {projetos} projetos e {tarefas} tarefas.</p>
	{/if}
</main>

<style>
	main {
		max-width: 40rem;
		margin: 3rem auto;
		padding: 0 1rem;
		font-family: system-ui, sans-serif;
	}
	.ok {
		color: #15803d;
	}
	.erro {
		color: #b91c1c;
	}
</style>
