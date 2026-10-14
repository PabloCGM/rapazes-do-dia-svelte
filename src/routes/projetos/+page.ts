import { listarProjetos } from '#lib/api.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	try {
		return { projetos: await listarProjetos(fetch), erro: '' };
	} catch {
		return { projetos: [], erro: 'Não foi possível carregar os projetos. Tente novamente.' };
	}
};
