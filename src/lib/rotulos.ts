import type { Prioridade, Status } from '../tipos';

export const rotuloStatus: Record<Status, string> = {
	'a-fazer': 'A fazer',
	'em-andamento': 'Em andamento',
	'em-revisao': 'Em revisão',
	concluida: 'Concluída'
};

export const rotuloPrioridade: Record<Prioridade, string> = {
	baixa: 'Baixa',
	media: 'Média',
	alta: 'Alta'
};

/** Converte `2026-10-06` em `06/10/2026` sem passar por fuso horário. */
export function formatarData(iso: string): string {
	const [ano, mes, dia] = iso.split('-');
	return dia && mes && ano ? `${dia}/${mes}/${ano}` : iso;
}
