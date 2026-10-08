import type { Projeto, Tarefa } from '../tipos';

export const API = 'http://localhost:3000';

export async function listarProjetos(): Promise<Projeto[]> {
	const resposta = await fetch(`${API}/projetos`);
	if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
	return resposta.json() as Promise<Projeto[]>;
}

export async function listarTarefas(): Promise<Tarefa[]> {
	const resposta = await fetch(`${API}/tarefas`);
	if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
	return resposta.json() as Promise<Tarefa[]>;
}
