<script lang="ts">
	import { resolve } from '$app/paths';
	import AlternarVisao from '#lib/componentes/AlternarVisao.svelte';
	import CartaoTarefa from '#lib/componentes/CartaoTarefa.svelte';
	import FiltrosTarefas from '#lib/componentes/FiltrosTarefas.svelte';
	import { filtrarTarefas, filtrosAtivos } from '#lib/filtros.svelte.ts';
	import type { Tarefa } from '../tipos';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let tarefas = $state(data.tarefas);
	const tarefasFiltradas = $derived(filtrarTarefas(tarefas));

	function atualizarTarefa(tarefaAtualizada: Tarefa) {
		tarefas = tarefas.map((tarefa) => tarefa.id === tarefaAtualizada.id ? tarefaAtualizada : tarefa);
	}
</script>

<svelte:head>
	<title>Lista de tarefas · Rapazes do Dia</title>
	<meta name="description" content="Acompanhe tarefas, responsáveis, prazos e prioridades." />
</svelte:head>

<header class="cabecalho">
	<div>
		<p class="sobretitulo">RAPAZES DO DIA</p>
		<h1>Lista de tarefas</h1>
		<p class="introducao">Acompanhe as tarefas, seus responsáveis, prazos e prioridades.</p>
	</div>
	<div class="acoes">
		<p class="contador" role="status">
			{#if filtrosAtivos()}
				{tarefasFiltradas.length} de {tarefas.length} {tarefas.length === 1 ? 'tarefa' : 'tarefas'}
			{:else}
				{tarefas.length} {tarefas.length === 1 ? 'tarefa' : 'tarefas'}
			{/if}
		</p>
		<AlternarVisao atual="lista" />
		<a class="nova-tarefa" href={resolve('/tarefas/nova')}>Nova tarefa</a>
	</div>
</header>

<FiltrosTarefas />

{#if tarefas.length === 0}
	<section class="vazia">
		<h2>Nenhuma tarefa encontrada</h2>
		<p>Quando houver tarefas cadastradas na API, elas aparecerão aqui.</p>
	</section>
{:else if tarefasFiltradas.length === 0}
	<section class="vazia">
		<h2>Nenhuma tarefa corresponde aos filtros</h2>
		<p>Altere a busca, o status ou a prioridade, ou use “Limpar filtros” para ver todas as tarefas.</p>
	</section>
{:else}
	<ul class="grade" aria-label="Tarefas">
		{#each tarefasFiltradas as tarefa (tarefa.id)}
			<li><CartaoTarefa {tarefa} onStatusChange={atualizarTarefa} /></li>
		{/each}
	</ul>
{/if}

<style>
	.acoes { display: flex; align-items: center; flex-wrap: wrap; gap: .75rem; }
	.nova-tarefa { flex-shrink: 0; padding: .65rem 1rem; border-radius: .5rem; background: #2563eb; color: #fff; font-weight: 650; text-decoration: none; }
	.nova-tarefa:hover { background: #1d4ed8; }
	.cabecalho { display: flex; align-items: flex-end; justify-content: space-between; gap: 1.5rem; margin-bottom: 2rem; }
	.sobretitulo { margin: 0 0 .5rem; color: #2563eb; font-size: .78rem; font-weight: 800; letter-spacing: .12em; }
	h1 { margin: 0; font-size: clamp(2rem, 5vw, 3rem); letter-spacing: -.04em; }
	.introducao { margin: .65rem 0 0; color: #64748b; line-height: 1.6; }
	.contador { flex-shrink: 0; margin: 0; padding: .5rem .8rem; border-radius: 999px; background: #e2e8f0; color: #334155; font-weight: 650; font-size: .9rem; }
	.grade {
		list-style: none;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 19rem), 1fr));
		gap: 1rem;
	}
	.grade li { display: grid; min-width: 0; }
	.vazia { padding: 1.5rem; border: 1px solid #e2e8f0; border-radius: 1rem; background: #fff; color: #475569; line-height: 1.6; }
	.vazia h2 { margin: 0 0 .5rem; color: #0f172a; font-size: 1.15rem; }
	.vazia p { margin: .4rem 0 0; }
	@media (max-width: 36rem) { .cabecalho { align-items: flex-start; flex-direction: column; } }
</style>
