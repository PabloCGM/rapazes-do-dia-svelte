import { error } from '@sveltejs/kit';
import { buscarProjeto } from '#lib/api.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	let projeto;
	try {
		projeto = await buscarProjeto(params.id, fetch);
	} catch {
		return { projeto: null, tarefas: [], erro: 'Não foi possível carregar o projeto. Tente novamente.' };
	}

	if (!projeto) error(404, 'Projeto não encontrado.');

	return { projeto, tarefas: projeto.tarefas, erro: '' };
};
