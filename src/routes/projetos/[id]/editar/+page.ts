import { error } from '@sveltejs/kit';
import { buscarProjeto } from '#lib/api.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const projeto = await buscarProjeto(params.id, fetch);
	if (!projeto) error(404, 'Projeto não encontrado');
	return { projeto };
};
