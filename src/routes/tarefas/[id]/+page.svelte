<script lang="ts">
	import { resolve } from '$app/paths';
	import { formatarData, rotuloPrioridade, rotuloStatus } from '#lib/rotulos.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const tarefa = $derived(data.tarefa);
</script>

<svelte:head>
	<title>{tarefa.titulo} · Rapazes do Dia</title>
</svelte:head>

<p><a href={resolve('/')}>← Voltar para as tarefas</a></p>

<h1>{tarefa.titulo}</h1>

<dl>
	<dt>Descrição</dt>
	<dd>{tarefa.descricao}</dd>
	<dt>Status</dt>
	<dd>{rotuloStatus[tarefa.status]}</dd>
	<dt>Prioridade</dt>
	<dd>{rotuloPrioridade[tarefa.prioridade]}</dd>
	<dt>Responsável</dt>
	<dd>{tarefa.responsavel}</dd>
	<dt>Prazo</dt>
	<dd><time datetime={tarefa.prazo}>{formatarData(tarefa.prazo)}</time></dd>
	<dt>Projeto</dt>
	<dd><a href={resolve('/projetos/[id]', { id: tarefa.projetoId })}>Projeto {tarefa.projetoId}</a></dd>
	<dt>Id</dt>
	<dd>{tarefa.id}</dd>
</dl>

<style>
	dl {
		display: grid;
		grid-template-columns: max-content 1fr;
		gap: 0.5rem 1.5rem;
	}
	dt {
		font-weight: 600;
		color: #52525b;
	}
	dd {
		margin: 0;
	}
</style>
