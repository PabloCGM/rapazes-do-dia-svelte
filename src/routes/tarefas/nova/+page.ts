import { listarProjetos } from '#lib/api.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
	const projetos = await listarProjetos(fetch);
	const projetoId = url.searchParams.get('projetoId');
	return { projetos, projetoId: projetos.find((projeto) => projeto.id === projetoId)?.id ?? '' };
};
