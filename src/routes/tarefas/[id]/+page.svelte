<script lang="ts">
	import { resolve } from '$app/paths';
	import { formatarData, rotuloPrioridade, rotuloStatus } from '#lib/rotulos.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const tarefa = $derived(data.tarefa);
</script>

<svelte:head>
	<title>{tarefa.titulo} · Rapazes do Dia</title>
	<meta name="description" content="Detalhes da tarefa {tarefa.id}: {tarefa.titulo}." />
</svelte:head>

<article class="detalhe">
	<a class="voltar" href={resolve('/')}>← Voltar para as tarefas</a>
	<div class="linha-superior">
		<p class="sobretitulo">TAREFA #{tarefa.id}</p>
		<span class="status status-{tarefa.status}">{rotuloStatus[tarefa.status]}</span>
	</div>
	<h1>{tarefa.titulo}</h1>
	<p><a class="editar" href={resolve('/tarefas/[id]/editar', { id: tarefa.id })}>Editar tarefa</a></p>
	<p class="descricao">{tarefa.descricao || 'Esta tarefa não possui descrição.'}</p>

	<dl class="metadados">
		<div><dt>Prioridade</dt><dd><span class="prioridade prioridade-{tarefa.prioridade}">{rotuloPrioridade[tarefa.prioridade]}</span></dd></div>
		<div><dt>Responsável</dt><dd>{tarefa.responsavel || 'Não definido'}</dd></div>
		<div><dt>Prazo</dt><dd>{tarefa.prazo ? formatarData(tarefa.prazo) : 'Sem prazo definido'}</dd></div>
		<div><dt>Projeto</dt><dd><a href={resolve('/projetos/[id]', { id: tarefa.projetoId })}>Projeto #{tarefa.projetoId}</a></dd></div>
		<div><dt>Identificador</dt><dd>{tarefa.id}</dd></div>
	</dl>
</article>

<style>
	.detalhe { max-width: 48rem; margin: 0 auto; padding: clamp(1.25rem, 4vw, 2.5rem); border: 1px solid #e2e8f0; border-radius: 1.25rem; background: #fff; box-shadow: 0 8px 30px rgb(15 23 42 / 6%); }
	.voltar { display: inline-block; margin-bottom: 2rem; color: #2563eb; font-weight: 650; text-decoration: none; }
	.voltar:hover { text-decoration: underline; }
	.editar { color: #2563eb; font-weight: 650; }
	.linha-superior { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
	.sobretitulo { margin: 0; color: #64748b; font-size: .8rem; font-weight: 750; letter-spacing: .1em; }
	h1 { margin: .7rem 0; color: #0f172a; font-size: clamp(1.8rem, 5vw, 2.6rem); line-height: 1.2; overflow-wrap: anywhere; }
	.descricao { margin: 0; color: #475569; font-size: 1.05rem; line-height: 1.7; white-space: pre-wrap; }
	.metadados { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr)); gap: 1rem; margin: 2rem 0 0; padding-top: 1.5rem; border-top: 1px solid #e2e8f0; }
	.metadados div { min-width: 0; }
	dt { margin-bottom: .45rem; color: #64748b; font-size: .8rem; }
	dd { margin: 0; color: #0f172a; font-weight: 600; overflow-wrap: anywhere; }
	dd a { color: #2563eb; }
	.status, .prioridade { display: inline-flex; align-items: center; border-radius: 999px; padding: .3rem .7rem; font-size: .82rem; font-weight: 650; }
	.status-a-fazer { color: #475569; background: #f1f5f9; }
	.status-em-andamento { color: #1d4ed8; background: #dbeafe; }
	.status-em-revisao { color: #92400e; background: #fef3c7; }
	.status-concluida { color: #166534; background: #dcfce7; }
	.prioridade-baixa { color: #166534; background: #dcfce7; }
	.prioridade-media { color: #92400e; background: #fef3c7; }
	.prioridade-alta { color: #b91c1c; background: #fee2e2; }
</style>
