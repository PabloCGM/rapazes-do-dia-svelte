import { error } from '@sveltejs/kit';
import { buscarProjeto } from '#lib/api.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	let projeto;
	try {
		projeto = await buscarProjeto(params.id, fetch);
	} catch {
		return { projeto: null, erro: 'Não foi possível carregar o projeto e suas tarefas. Tente novamente.' };
	}
	if (!projeto) error(404, 'Projeto não encontrado');
	return { projeto, erro: '' };
};
