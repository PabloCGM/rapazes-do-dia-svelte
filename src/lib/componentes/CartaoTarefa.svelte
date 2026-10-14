<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Tarefa } from '../../tipos';
	import { formatarData, rotuloPrioridade, rotuloStatus } from '../rotulos';

	let { tarefa }: { tarefa: Tarefa } = $props();
</script>

<article class="cartao">
	<div class="linha-superior">
		<span class="id">Tarefa #{tarefa.id}</span>
		<span class="status status-{tarefa.status}">{rotuloStatus[tarefa.status]}</span>
	</div>
	<h2><a href={resolve('/tarefas/[id]', { id: tarefa.id })}>{tarefa.titulo}</a></h2>
	<p class="descricao">{tarefa.descricao || 'Sem descrição.'}</p>
	<div class="metadados">
		<p><span class="rotulo">Prioridade</span><span class="prioridade prioridade-{tarefa.prioridade}">{rotuloPrioridade[tarefa.prioridade]}</span></p>
		<p><span class="rotulo">Responsável</span><span>{tarefa.responsavel || 'Não definido'}</span></p>
		<p><span class="rotulo">Prazo</span><time datetime={tarefa.prazo}>{tarefa.prazo ? formatarData(tarefa.prazo) : 'Sem prazo definido'}</time></p>
	</div>
	<a class="detalhes" href={resolve('/tarefas/[id]', { id: tarefa.id })}>Ver detalhes <span aria-hidden="true">→</span></a>
</article>

<style>
	.cartao {
		display: flex;
		flex-direction: column;
		gap: .9rem;
		min-width: 0;
		padding: 1.25rem;
		border: 1px solid #e2e8f0;
		border-radius: 1rem;
		background: #fff;
		box-shadow: 0 4px 16px rgb(15 23 42 / 5%);
	}
	.linha-superior { display: flex; align-items: center; justify-content: space-between; gap: .75rem; }
	.id, .rotulo { color: #64748b; font-size: .8rem; }
	.status, .prioridade { display: inline-flex; align-items: center; border-radius: 999px; padding: .25rem .65rem; font-size: .78rem; font-weight: 650; }
	.status-a-fazer { color: #475569; background: #f1f5f9; }
	.status-em-andamento { color: #1d4ed8; background: #dbeafe; }
	.status-em-revisao { color: #92400e; background: #fef3c7; }
	.status-concluida { color: #166534; background: #dcfce7; }
	h2 { margin: 0; font-size: 1.15rem; line-height: 1.4; overflow-wrap: anywhere; }
	h2 a { color: #0f172a; text-decoration: none; }
	h2 a:hover { color: #2563eb; }
	.descricao { margin: 0; color: #475569; line-height: 1.55; overflow-wrap: anywhere; }
	.metadados { display: grid; gap: .65rem; padding-top: .9rem; border-top: 1px solid #f1f5f9; }
	.metadados p { display: flex; align-items: center; justify-content: space-between; gap: .75rem; margin: 0; font-size: .9rem; }
	.prioridade-baixa { color: #166534; background: #dcfce7; }
	.prioridade-media { color: #92400e; background: #fef3c7; }
	.prioridade-alta { color: #b91c1c; background: #fee2e2; }
	.detalhes { align-self: flex-start; color: #2563eb; font-weight: 650; text-decoration: none; }
	.detalhes:hover { text-decoration: underline; }
	:global(a:focus-visible) {
		outline: 3px solid #1d4ed8;
		outline-offset: 3px;
	}
</style>
