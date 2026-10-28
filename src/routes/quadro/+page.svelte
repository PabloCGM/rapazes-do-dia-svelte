<script lang="ts">
	import CartaoTarefa from '#lib/componentes/CartaoTarefa.svelte';
	import { rotuloStatus } from '#lib/rotulos.ts';
	import type { Status, Tarefa } from '../../tipos';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let tarefas = $state(data.tarefas);
	const colunas = Object.entries(rotuloStatus) as [Status, string][];
	const tarefasPorStatus = $derived(
		Object.fromEntries(
			colunas.map(([status]) => [status, tarefas.filter((tarefa) => tarefa.status === status)])
		) as Record<Status, Tarefa[]>
	);

	function atualizarTarefa(tarefaAtualizada: Tarefa) {
		tarefas = tarefas.map((tarefa) => tarefa.id === tarefaAtualizada.id ? tarefaAtualizada : tarefa);
	}
</script>

<svelte:head>
	<title>Quadro de tarefas · Rapazes do Dia</title>
	<meta name="description" content="Visualize as tarefas agrupadas por status." />
</svelte:head>

<header class="cabecalho">
	<div>
		<p class="sobretitulo">RAPAZES DO DIA</p>
		<h1>Quadro de tarefas</h1>
		<p class="introducao">Acompanhe as tarefas agrupadas por status.</p>
	</div>
	<p class="contador" role="status">{tarefas.length} {tarefas.length === 1 ? 'tarefa' : 'tarefas'}</p>
</header>

{#if tarefas.length === 0}
	<section class="vazia">
		<h2>Nenhuma tarefa encontrada</h2>
		<p>Quando houver tarefas cadastradas na API, elas aparecerão aqui.</p>
	</section>
{/if}

	<div class="rolagem-quadro" tabindex="0" aria-label="Quadro de tarefas. Role horizontalmente para ver todas as colunas.">
		<div class="quadro">
			{#each colunas as [status, rotulo]}
				<section class="coluna" aria-labelledby={"coluna-" + status}>
					<header class="cabecalho-coluna">
						<h2 id={"coluna-" + status}>{rotulo}</h2>
						<span class="quantidade" aria-label={tarefasPorStatus[status].length + ' tarefas'}>
							{tarefasPorStatus[status].length}
						</span>
					</header>
					{#if tarefasPorStatus[status].length === 0}
						<p class="coluna-vazia">Nenhuma tarefa neste status.</p>
					{:else}
						<ul class="tarefas-coluna" aria-label={'Tarefas: ' + rotulo}>
							{#each tarefasPorStatus[status] as tarefa (tarefa.id)}
								<li><CartaoTarefa {tarefa} onStatusChange={atualizarTarefa} modoQuadro /></li>
							{/each}
						</ul>
					{/if}
				</section>
			{/each}
		</div>
	</div>

<style>
	.cabecalho { display: flex; align-items: flex-end; justify-content: space-between; gap: 1.5rem; margin-bottom: 2rem; }
	.sobretitulo { margin: 0 0 .5rem; color: #2563eb; font-size: .78rem; font-weight: 800; letter-spacing: .12em; }
	h1 { margin: 0; font-size: clamp(2rem, 5vw, 3rem); letter-spacing: -.04em; }
	.introducao { margin: .65rem 0 0; color: #64748b; line-height: 1.6; }
	.contador { flex-shrink: 0; margin: 0; padding: .5rem .8rem; border-radius: 999px; background: #e2e8f0; color: #334155; font-weight: 650; font-size: .9rem; }
	.rolagem-quadro { overflow-x: auto; padding: .25rem .1rem 1rem; }
	.rolagem-quadro:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 3px; }
	.quadro { display: grid; grid-template-columns: repeat(4, minmax(14rem, 1fr)); gap: 1rem; min-width: 59rem; align-items: start; }
	.coluna { min-width: 0; padding: .75rem; border: 1px solid #e2e8f0; border-radius: .85rem; background: #f1f5f9; }
	.cabecalho-coluna { display: flex; align-items: center; justify-content: space-between; gap: .75rem; margin: 0 0 .75rem; }
	.cabecalho-coluna h2 { margin: 0; color: #334155; font-size: 1rem; }
	.quantidade { min-width: 1.75rem; padding: .2rem .45rem; border-radius: 999px; background: #e2e8f0; color: #334155; text-align: center; font-size: .8rem; font-weight: 700; }
	.tarefas-coluna { display: grid; gap: .75rem; margin: 0; padding: 0; list-style: none; }
	.tarefas-coluna li { min-width: 0; }
	.coluna-vazia { margin: 0; padding: 1rem .5rem; color: #64748b; font-size: .9rem; text-align: center; }
	.vazia { padding: 1.5rem; border: 1px solid #e2e8f0; border-radius: 1rem; background: #fff; color: #475569; line-height: 1.6; }
	.vazia h2 { margin: 0 0 .5rem; color: #0f172a; font-size: 1.15rem; }
	.vazia p { margin: .4rem 0 0; }
	@media (max-width: 36rem) { .cabecalho { align-items: flex-start; flex-direction: column; } }
</style>
