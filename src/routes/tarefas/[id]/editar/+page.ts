import { error } from '@sveltejs/kit';
import { buscarTarefa, listarProjetos } from '#lib/api.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const tarefa = await buscarTarefa(params.id, fetch);
	if (!tarefa) error(404, 'Tarefa não encontrada');
	return { tarefa, projetos: await listarProjetos(fetch) };
};
