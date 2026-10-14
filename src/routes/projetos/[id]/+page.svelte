<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { formatarData } from '#lib/formatarData.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head><title>{data.projeto?.nome ?? 'Projeto'} | Rapazes do Dia</title></svelte:head>

<a href={resolve('/projetos')}>← Voltar para projetos</a>

{#if data.projeto}
	<header>
		<h1>{data.projeto.nome}</h1>
		<p class="descricao">{data.projeto.descricao}</p>
		<dl>
			<div><dt>Disciplina</dt><dd>{data.projeto.disciplina}</dd></div>
			<div><dt>Criado em</dt><dd><time datetime={data.projeto.criadoEm}>{formatarData(data.projeto.criadoEm)}</time></dd></div>
		</dl>
	</header>
	<h2>Tarefas do projeto{data.erro ? '' : ` (${data.tarefas.length})`}</h2>
{:else}
	<h1>Projeto</h1>
{/if}

{#if data.erro}
	<div class="mensagem erro" role="alert">
		<p>{data.erro}</p>
		<button onclick={() => invalidateAll()}>Tentar novamente</button>
	</div>
{:else if data.tarefas.length === 0}
	<p class="mensagem">Este projeto ainda não tem tarefas.</p>
{:else}
	<div class="area-tarefas">
		<!-- Integrar aqui o cartão de tarefas desenvolvido pelo colega, usando data.tarefas. -->
	</div>
{/if}

<style>
	.area-tarefas {
		min-height: 8rem;
	}
	h2 {
		margin: 2rem 0 1rem;
	}
	header {
		padding-bottom: 1rem;
		border-bottom: 1px solid #d1d5db;
	}
	.descricao {
		line-height: 1.6;
		overflow-wrap: anywhere;
	}
	dl {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem 3rem;
	}
	dt {
		font-size: 0.875rem;
		color: #4b5563;
		margin-bottom: 0.25rem;
	}
	dd {
		margin: 0;
		overflow-wrap: anywhere;
	}
</style>
