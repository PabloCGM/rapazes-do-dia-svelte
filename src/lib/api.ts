import type { NovaTarefa, Projeto, Tarefa } from '../tipos';

export const API = 'http://localhost:3000';

/** Projeto com as tarefas embutidas (`GET /projetos/:id?_embed=tarefas`). */
export type ProjetoComTarefas = Projeto & { tarefas: Tarefa[] };

type Fetch = typeof fetch;

/** Faz um GET na API; devolve `null` em 404 e lança erro nos demais status. */
async function obter<T>(caminho: string, f: Fetch = fetch): Promise<T | null> {
	const resposta = await f(`${API}${caminho}`);
	if (resposta.status === 404) return null;
	if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
	return resposta.json() as Promise<T>;
}

export async function listarProjetos(f: Fetch = fetch): Promise<Projeto[]> {
	return (await obter<Projeto[]>('/projetos', f)) ?? [];
}

export async function buscarProjeto(id: string, f: Fetch = fetch): Promise<ProjetoComTarefas | null> {
	// Usa _embed porque `/tarefas?projetoId=1` volta vazio (o json-server compara número com texto).
	return obter<ProjetoComTarefas>(`/projetos/${encodeURIComponent(id)}?_embed=tarefas`, f);
}

export async function listarTarefas(f: Fetch = fetch): Promise<Tarefa[]> {
	return (await obter<Tarefa[]>('/tarefas', f)) ?? [];
}

export async function buscarTarefa(id: string, f: Fetch = fetch): Promise<Tarefa | null> {
	return obter<Tarefa>(`/tarefas/${encodeURIComponent(id)}`, f);
}

async function gravarTarefa(caminho: string, metodo: 'POST' | 'PATCH', dados: NovaTarefa, f: Fetch): Promise<Tarefa> {
	const resposta = await f(`${API}${caminho}`, {
		method: metodo,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(dados)
	});
	if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
	return resposta.json() as Promise<Tarefa>;
}

export function criarTarefa(dados: NovaTarefa, f: Fetch = fetch): Promise<Tarefa> {
	return gravarTarefa('/tarefas', 'POST', dados, f);
}

export function atualizarTarefa(id: string, dados: NovaTarefa, f: Fetch = fetch): Promise<Tarefa> {
	return gravarTarefa(`/tarefas/${encodeURIComponent(id)}`, 'PATCH', dados, f);
}
