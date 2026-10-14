<script lang="ts">
	import CartaoTarefa from '#lib/componentes/CartaoTarefa.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Tarefas · Rapazes do Dia</title>
</svelte:head>

<h1>Tarefas</h1>

<ul class="grade">
	{#each data.tarefas as tarefa (tarefa.id)}
		<li><CartaoTarefa {tarefa} /></li>
	{/each}
</ul>

<style>
	.grade {
		list-style: none;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
		gap: 1rem;
	}
</style>
