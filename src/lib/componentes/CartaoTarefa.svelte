<script lang="ts">
	import { resolve } from '$app/paths';
	import { atualizarTarefa } from '../api';
	import type { Status, Tarefa } from '../../tipos';
	import { formatarData, rotuloPrioridade, rotuloStatus } from '../rotulos';

	let {
		tarefa,
		onStatusChange,
		modoQuadro = false
	}: {
		tarefa: Tarefa;
		onStatusChange?: (tarefa: Tarefa) => void;
		modoQuadro?: boolean;
	} = $props();

	let statusAtual = $state<Status>(tarefa.status);
	let salvandoStatus = $state(false);
	let erroStatus = $state('');
	const statusDisponiveis = Object.entries(rotuloStatus) as [Status, string][];
	const corStatus: Record<Status, string> = {
		'a-fazer': '#475569',
		'em-andamento': '#1d4ed8',
		'em-revisao': '#92400e',
		concluida: '#166534'
	};

	$effect(() => {
		statusAtual = tarefa.status;
	});

	async function alterarStatus(event: Event) {
		const novoStatus = (event.currentTarget as HTMLSelectElement).value as Status;
		if (novoStatus === statusAtual) return;

		const statusAnterior = statusAtual;
		salvandoStatus = true;
		erroStatus = '';

		try {
			const tarefaAtualizada = await atualizarTarefa(tarefa.id, { status: novoStatus });
			statusAtual = tarefaAtualizada.status;
			onStatusChange?.(tarefaAtualizada);
		} catch {
			statusAtual = statusAnterior;
			erroStatus = 'Não foi possível atualizar o status. Tente novamente.';
		} finally {
			salvandoStatus = false;
		}
	}
</script>

<article class="cartao" class:cartao-quadro={modoQuadro}>
	<div class="linha-superior">
		<span class="id">Tarefa #{tarefa.id}</span>
		<label class="status-controle" style:color={corStatus[statusAtual]}>
			<span class="visualmente-escondido">Status da tarefa {tarefa.titulo}</span>
			<select
				class="status status-{statusAtual}"
				value={statusAtual}
				disabled={salvandoStatus}
				aria-busy={salvandoStatus}
				onchange={alterarStatus}
			>
				{#each statusDisponiveis as [valor, rotulo]}
					<option value={valor}>{rotulo}</option>
				{/each}
			</select>
		</label>
	</div>
	{#if erroStatus}
		<p class="erro-status" role="alert">{erroStatus}</p>
	{/if}
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
	.status-controle { position: relative; display: inline-flex; }
	.status-controle::after { content: ''; position: absolute; top: 50%; right: .7rem; width: .4rem; height: .4rem; border-right: 2px solid currentColor; border-bottom: 2px solid currentColor; transform: translateY(-65%) rotate(45deg); pointer-events: none; }
	select.status { max-width: 10rem; padding-right: 1.75rem; border: 1px solid transparent; appearance: none; cursor: pointer; }
	select.status:disabled { cursor: wait; opacity: .75; }
	.visualmente-escondido { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
	.erro-status { margin: -.35rem 0 0; color: #b91c1c; font-size: .85rem; }
	.cartao-quadro { box-sizing: border-box; min-height: 24rem; }
	.cartao-quadro .metadados { margin-top: auto; }
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
