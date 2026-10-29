import type { Prioridade, Status, Tarefa } from '../tipos';

/**
 * Estado único de busca e filtros, compartilhado pela lista e pelo quadro.
 * Fica no módulo, então sobrevive à troca de visão sem recarregar a página.
 */
export const filtros = $state({
	busca: '',
	status: '' as Status | '',
	prioridade: '' as Prioridade | ''
});

function normalizar(texto: string): string {
	return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLocaleLowerCase('pt-BR');
}

export function filtrosAtivos(): boolean {
	return filtros.busca.trim() !== '' || filtros.status !== '' || filtros.prioridade !== '';
}

export function filtrarTarefas(tarefas: Tarefa[]): Tarefa[] {
	const termo = normalizar(filtros.busca.trim());
	return tarefas.filter((tarefa) =>
		normalizar(tarefa.titulo).includes(termo)
		&& (filtros.status === '' || tarefa.status === filtros.status)
		&& (filtros.prioridade === '' || tarefa.prioridade === filtros.prioridade)
	);
}

export function limparFiltros() {
	filtros.busca = '';
	filtros.status = '';
	filtros.prioridade = '';
}
