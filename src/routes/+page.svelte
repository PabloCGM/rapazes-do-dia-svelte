<script lang="ts">
	import { resolve } from '$app/paths';
	import CartaoTarefa from '#lib/componentes/CartaoTarefa.svelte';
	import { rotuloPrioridade, rotuloStatus } from '#lib/rotulos.ts';
	import type { Prioridade, Status, Tarefa } from '../tipos';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let tarefas = $state(data.tarefas);
	let busca = $state('');
	let status = $state<Status | ''>('');
	let prioridade = $state<Prioridade | ''>('');

	function normalizar(texto: string): string {
		return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
	}

	const termo = $derived(normalizar(busca.trim()));
	const filtrosAtivos = $derived(termo !== '' || status !== '' || prioridade !== '');
	const tarefasFiltradas = $derived(tarefas.filter((tarefa) =>
		normalizar(tarefa.titulo).includes(termo)
		&& (status === '' || tarefa.status === status)
		&& (prioridade === '' || tarefa.prioridade === prioridade)
	));

	function atualizarTarefa(tarefaAtualizada: Tarefa) {
		tarefas = tarefas.map((tarefa) => tarefa.id === tarefaAtualizada.id ? tarefaAtualizada : tarefa);
	}

	function limparFiltros() {
		busca = '';
		status = '';
		prioridade = '';
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
			{#if filtrosAtivos}
				{tarefasFiltradas.length} de {tarefas.length} {tarefas.length === 1 ? 'tarefa' : 'tarefas'}
			{:else}
				{tarefas.length} {tarefas.length === 1 ? 'tarefa' : 'tarefas'}
			{/if}
		</p>
		<a class="nova-tarefa" href={resolve('/tarefas/nova')}>Nova tarefa</a>
	</div>
</header>

<fieldset class="filtros">
	<legend>Buscar e filtrar tarefas</legend>
	<div class="campos-filtros">
		<div class="campo busca">
			<label for="busca-titulo">Buscar por título</label>
			<input id="busca-titulo" type="search" placeholder="Digite parte do título" bind:value={busca} />
		</div>
		<div class="campo">
			<label for="filtro-status">Status</label>
			<select id="filtro-status" bind:value={status}>
				<option value="">Todos os status</option>
				{#each Object.entries(rotuloStatus) as [valor, rotulo]}
					<option value={valor}>{rotulo}</option>
				{/each}
			</select>
		</div>
		<div class="campo">
			<label for="filtro-prioridade">Prioridade</label>
			<select id="filtro-prioridade" bind:value={prioridade}>
				<option value="">Todas as prioridades</option>
				{#each Object.entries(rotuloPrioridade) as [valor, rotulo]}
					<option value={valor}>{rotulo}</option>
				{/each}
			</select>
		</div>
		<button type="button" onclick={limparFiltros}>Limpar filtros</button>
	</div>
</fieldset>

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
	.filtros { min-width: 0; margin: 0 0 1.5rem; padding: 1rem; border: 1px solid #e2e8f0; border-radius: .75rem; background: #fff; }
	legend { padding: 0 .35rem; color: #334155; font-weight: 650; }
	.campos-filtros { display: flex; align-items: flex-end; flex-wrap: wrap; gap: 1rem; }
	.campo { display: flex; flex: 1 1 10rem; flex-direction: column; gap: .4rem; min-width: 0; }
	.campo.busca { flex: 2 1 15rem; }
	label { color: #334155; font-size: .9rem; font-weight: 650; }
	input, select, button { box-sizing: border-box; min-height: 2.75rem; padding: .6rem .75rem; border: 1px solid #94a3b8; border-radius: .5rem; background: #fff; color: #0f172a; font: inherit; }
	input, select { width: 100%; }
	button { cursor: pointer; }
	button:hover { background: #f1f5f9; }
	input:focus-visible, select:focus-visible, button:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 3px; }
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
