<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Tarefa } from '../../tipos';
	import { formatarData, rotuloPrioridade, rotuloStatus } from '../rotulos';

	let { tarefa }: { tarefa: Tarefa } = $props();
</script>

<article class="cartao">
	<h3><a href={resolve('/tarefas/[id]', { id: tarefa.id })}>{tarefa.titulo}</a></h3>
	<div class="etiquetas">
		<span class="status {tarefa.status}">{rotuloStatus[tarefa.status]}</span>
		<span class="prioridade {tarefa.prioridade}">Prioridade {rotuloPrioridade[tarefa.prioridade]}</span>
	</div>
	<dl>
		<dt>Responsável</dt>
		<dd>{tarefa.responsavel}</dd>
		<dt>Prazo</dt>
		<dd><time datetime={tarefa.prazo}>{formatarData(tarefa.prazo)}</time></dd>
	</dl>
</article>

<style>
	.cartao {
		border: 1px solid #d4d4d8;
		border-radius: 0.5rem;
		padding: 1rem;
		background: #fff;
	}
	h3 {
		margin: 0 0 0.5rem;
		font-size: 1.05rem;
	}
	a {
		color: inherit;
	}
	.etiquetas {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin-bottom: 0.5rem;
	}
	.etiquetas span {
		font-size: 0.8rem;
		padding: 0.1rem 0.5rem;
		border-radius: 999px;
		background: #f4f4f5;
	}
	.status.concluida { background: #dcfce7; }
	.status.em-andamento { background: #dbeafe; }
	.status.em-revisao { background: #fef9c3; }
	.prioridade.alta { background: #fee2e2; }
	dl {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.2rem 0.75rem;
		margin: 0;
		font-size: 0.9rem;
	}
	dt {
		color: #52525b;
	}
	dd {
		margin: 0;
	}
</style>
