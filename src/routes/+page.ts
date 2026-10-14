import { listarTarefas } from '#lib/api.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	return { tarefas: await listarTarefas(fetch) };
};
