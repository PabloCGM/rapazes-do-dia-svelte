<script lang="ts">
	import { resolve } from '$app/paths';
	import CartaoTarefa from '#lib/componentes/CartaoTarefa.svelte';
	import { formatarData } from '#lib/rotulos.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const projeto = $derived(data.projeto);
</script>

<svelte:head>
	<title>{projeto.nome} · Rapazes do Dia</title>
</svelte:head>

<p><a href={resolve('/projetos')}>← Voltar para os projetos</a></p>

<h1>{projeto.nome}</h1>
<p>{projeto.descricao}</p>
<p class="meta">{projeto.disciplina} · criado em {formatarData(projeto.criadoEm)}</p>

<h2>Tarefas</h2>
{#if projeto.tarefas.length === 0}
	<p>Este projeto ainda não tem tarefas.</p>
{:else}
	<ul class="grade">
		{#each projeto.tarefas as tarefa (tarefa.id)}
			<li><CartaoTarefa {tarefa} /></li>
		{/each}
	</ul>
{/if}

<style>
	.meta {
		color: #52525b;
	}
	.grade {
		list-style: none;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
		gap: 1rem;
	}
</style>
