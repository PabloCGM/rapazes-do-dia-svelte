import type { NovaTarefa, Projeto, Tarefa } from '../tipos';

/** Endereço da API: `VITE_API_URL` quando publicada; o json-server local no desenvolvimento. */
export const API: string = import.meta.env.VITE_API_URL || 'http://localhost:3000';

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

/** Dados de um projeto sem o `id` gerado pela API. */
export type NovoProjeto = Omit<Projeto, 'id'>;

/** Envia um POST ou PATCH com JSON; lança erro se a API não aceitar. */
async function gravar<T>(caminho: string, metodo: 'POST' | 'PATCH', dados: unknown, f: Fetch): Promise<T> {
	const resposta = await f(`${API}${caminho}`, {
		method: metodo,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(dados)
	});
	if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
	return resposta.json() as Promise<T>;
}

/** Cria a tarefa com o próximo ID numérico disponível na coleção local. */
export async function criarTarefa(dados: NovaTarefa, f: Fetch = fetch): Promise<Tarefa> {
	const tarefas = await listarTarefas(f);
	const maiorId = tarefas.reduce((maior, tarefa) => {
		const id = Number(tarefa.id);
		return Number.isSafeInteger(id) && id > maior ? id : maior;
	}, 0);
	return gravar<Tarefa>('/tarefas', 'POST', { ...dados, id: String(maiorId + 1) }, f);
}

export function atualizarTarefa(id: string, dados: Partial<NovaTarefa>, f: Fetch = fetch): Promise<Tarefa> {
	return gravar<Tarefa>(`/tarefas/${encodeURIComponent(id)}`, 'PATCH', dados, f);
}

export function criarProjeto(dados: NovoProjeto, f: Fetch = fetch): Promise<Projeto> {
	return gravar<Projeto>('/projetos', 'POST', dados, f);
}

export function atualizarProjeto(id: string, dados: Partial<NovoProjeto>, f: Fetch = fetch): Promise<Projeto> {
	return gravar<Projeto>(`/projetos/${encodeURIComponent(id)}`, 'PATCH', dados, f);
}
