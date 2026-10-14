import { listarProjetos } from '#lib/api.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	return { projetos: await listarProjetos(fetch) };
};
