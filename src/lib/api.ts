import type { Projeto, Tarefa } from '../tipos';

export const API = 'http://localhost:3000';

export type ProjetoComTarefas = Projeto & { tarefas: Tarefa[] };

export async function listarProjetos(requisitar: typeof fetch = fetch): Promise<Projeto[]> {
	const resposta = await requisitar(`${API}/projetos`);
	if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
	return resposta.json() as Promise<Projeto[]>;
}

export async function buscarProjeto(
	id: string,
	requisitar: typeof fetch = fetch
): Promise<ProjetoComTarefas | null> {
	const resposta = await requisitar(`${API}/projetos/${encodeURIComponent(id)}?_embed=tarefas`);
	if (resposta.status === 404) return null;
	if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
	return resposta.json() as Promise<ProjetoComTarefas>;
}

export async function listarTarefas(): Promise<Tarefa[]> {
	const resposta = await fetch(`${API}/tarefas`);
	if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
	return resposta.json() as Promise<Tarefa[]>;
}
