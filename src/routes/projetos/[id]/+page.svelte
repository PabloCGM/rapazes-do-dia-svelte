<script lang="ts">
	import { resolve } from '$app/paths';
	import { invalidateAll } from '$app/navigation';
	import CartaoTarefa from '#lib/componentes/CartaoTarefa.svelte';
	import { formatarData } from '#lib/rotulos.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const projeto = $derived(data.projeto);
</script>

<svelte:head>
	<title>{projeto?.nome ?? 'Projeto'} · Rapazes do Dia</title>
</svelte:head>

<p><a href={resolve('/projetos')}>← Voltar para os projetos</a></p>

{#if projeto}
	<h1>{projeto.nome}</h1>
	<p class="descricao">{projeto.descricao}</p>
	<dl class="dados">
		<div><dt>Disciplina</dt><dd>{projeto.disciplina}</dd></div>
		<div><dt>Criado em</dt><dd><time datetime={projeto.criadoEm}>{formatarData(projeto.criadoEm)}</time></dd></div>
	</dl>

	<h2>Tarefas do projeto ({projeto.tarefas.length})</h2>
	{#if projeto.tarefas.length === 0}
		<p>Este projeto ainda não tem tarefas.</p>
	{:else}
		<ul class="grade" aria-label="Tarefas do projeto">
			{#each projeto.tarefas as tarefa (tarefa.id)}
				<li><CartaoTarefa {tarefa} /></li>
			{/each}
		</ul>
	{/if}
{:else}
	<h1>Projeto</h1>
{/if}

{#if data.erro}
	<div class="mensagem erro" role="alert">
		<p>{data.erro}</p>
		<button onclick={() => invalidateAll()}>Tentar novamente</button>
	</div>
{/if}

<style>
	dt {
		color: #52525b;
	}
	.dados {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem 3rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid #d4d4d8;
	}
	dd {
		margin: 0.25rem 0 0;
	}
	h1, .descricao, dd {
		overflow-wrap: anywhere;
	}
	.descricao {
		line-height: 1.6;
	}
	.grade {
		list-style: none;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 16rem), 1fr));
		grid-auto-rows: 1fr;
		gap: 1rem;
	}
	.grade li {
		display: grid;
		min-width: 0;
	}
	.mensagem {
		padding: 1rem;
		border: 1px solid #fecaca;
		border-radius: 0.5rem;
		background: #fef2f2;
		color: #991b1b;
	}
	button {
		padding: 0.5rem 0.75rem;
		border: 1px solid currentColor;
		border-radius: 0.375rem;
		background: #fff;
		color: #18181b;
		font: inherit;
		cursor: pointer;
	}
	a:focus-visible, button:focus-visible {
		outline: 3px solid #1d4ed8;
		outline-offset: 3px;
	}
</style>
